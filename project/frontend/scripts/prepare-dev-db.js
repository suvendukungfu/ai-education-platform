#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */
const { execFileSync } = require("node:child_process")
const fs = require("node:fs")
const path = require("node:path")

function resolveDbPath(databaseUrl) {
  if (!databaseUrl || !databaseUrl.startsWith("file:")) {
    return null
  }

  const filePath = databaseUrl.slice("file:".length)
  if (!filePath) {
    return null
  }

  return path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath)
}

function runSql(dbPath, sql) {
  return execFileSync("sqlite3", [dbPath, sql], { encoding: "utf8" }).trim()
}

function queryRows(dbPath, sql) {
  const separator = "\x1f"
  const output = execFileSync("sqlite3", ["-separator", separator, dbPath, sql], {
    encoding: "utf8",
  }).trim()

  if (!output) {
    return []
  }

  return output.split("\n").map((line) => line.split(separator))
}

function escapeSql(value) {
  return String(value).replace(/'/g, "''")
}

function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function buildReferralCode(email, name, id, usedCodes) {
  const emailHandle = email.includes("@") ? email.split("@")[0] : email
  const base = slugify(emailHandle || name || id).slice(0, 18) || "user"
  const suffix = slugify(id).replace(/-/g, "").slice(0, 10) || "account"

  let candidate = `${base}-${suffix}`
  let counter = 2

  while (usedCodes.has(candidate)) {
    candidate = `${base}-${suffix}-${counter}`
    counter += 1
  }

  return candidate
}

function main() {
  const dbPath = resolveDbPath(process.env.DATABASE_URL)

  if (!dbPath) {
    console.log("Skipping SQLite dev DB preparation because DATABASE_URL is not a file path.")
    return
  }

  if (!fs.existsSync(dbPath)) {
    console.log(`Skipping SQLite dev DB preparation because ${dbPath} does not exist yet.`)
    return
  }

  const hasUserTable = Number(
    runSql(dbPath, "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' AND name = 'User';"),
  )
  if (!hasUserTable) {
    console.log("Skipping SQLite dev DB preparation because the User table does not exist yet.")
    return
  }

  const hasReferralCodeColumn = Number(
    runSql(dbPath, "SELECT COUNT(*) FROM pragma_table_info('User') WHERE name = 'referralCode';"),
  )

  if (!hasReferralCodeColumn) {
    runSql(dbPath, 'ALTER TABLE "User" ADD COLUMN "referralCode" TEXT;')
    console.log("Added nullable referralCode column for existing users.")
  }

  const users = queryRows(
    dbPath,
    'SELECT id, COALESCE(email, \'\'), COALESCE(name, \'\'), COALESCE("referralCode", \'\') FROM "User" ORDER BY id ASC;',
  )

  if (users.length === 0) {
    console.log("SQLite dev DB has no existing users to backfill.")
    return
  }

  const usedCodes = new Set()
  const updates = []

  for (const [id, email, name, currentCode] of users) {
    const trimmedCode = currentCode.trim()

    if (trimmedCode && !usedCodes.has(trimmedCode)) {
      usedCodes.add(trimmedCode)
      continue
    }

    const nextCode = buildReferralCode(email, name, id, usedCodes)
    usedCodes.add(nextCode)
    updates.push({ id, code: nextCode })
  }

  if (updates.length === 0) {
    console.log("Existing users already have unique referral codes.")
    return
  }

  const statements = updates.map(
    ({ id, code }) =>
      `UPDATE "User" SET "referralCode" = '${escapeSql(code)}' WHERE id = '${escapeSql(id)}';`,
  )

  runSql(dbPath, `BEGIN;\n${statements.join("\n")}\nCOMMIT;`)
  console.log(
    `Backfilled unique referral codes for ${updates.length} existing user${updates.length === 1 ? "" : "s"}.`,
  )
}

try {
  main()
} catch (error) {
  console.error("Failed to prepare the SQLite dev DB for Prisma schema sync.")
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
