import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import db from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    if (!email || !password) {
      return new NextResponse("Missing email or password", { status: 400 })
    }

    const exists = await db.user.findUnique({
      where: { email }
    })

    if (exists) {
      return new NextResponse("User already exists", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "STUDENT"
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error("SIGNUP_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
