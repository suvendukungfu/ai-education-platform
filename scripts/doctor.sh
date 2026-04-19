#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/project/frontend"
ENGINE_DIR="$ROOT_DIR/project/ai-engine"

run_step() {
  local label="$1"
  shift

  echo
  echo "==> ${label}"
  "$@"
}

if [[ ! -d "$FRONTEND_DIR" ]]; then
  echo "Missing frontend directory: $FRONTEND_DIR" >&2
  exit 1
fi

if [[ ! -d "$ENGINE_DIR" ]]; then
  echo "Missing AI engine directory: $ENGINE_DIR" >&2
  exit 1
fi

run_step "Frontend lint" bash -lc "cd '$FRONTEND_DIR' && npm run lint"
run_step "Frontend build" bash -lc "cd '$FRONTEND_DIR' && npm run build"
run_step "Prisma schema validation" bash -lc "cd '$FRONTEND_DIR' && npm run prisma:validate"

if [[ ! -x "$ENGINE_DIR/venv/bin/python" ]]; then
  echo
  echo "Missing Python virtual environment at $ENGINE_DIR/venv/bin/python" >&2
  echo "Run 'npm run install:all' from the repo root to provision dependencies." >&2
  exit 1
fi

run_step "AI engine import check" bash -lc "cd '$ENGINE_DIR' && ./venv/bin/python -c 'import main; print(main.app.title)'"

echo
echo "Doctor checks passed."
