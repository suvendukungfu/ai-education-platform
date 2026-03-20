#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$ROOT_DIR/project/frontend"
ENGINE_DIR="$ROOT_DIR/project/ai-engine"
ENGINE_VENV_DIR="$ENGINE_DIR/venv"
ENGINE_PYTHON="$ENGINE_VENV_DIR/bin/python"
ENGINE_PIP="$ENGINE_VENV_DIR/bin/pip"
FRONTEND_DB_FILE="$FRONTEND_DIR/dev.db"
FRONTEND_DB_URL="file:$FRONTEND_DB_FILE"

FRONTEND_BASE_PORT="${FRONTEND_BASE_PORT:-3000}"
ENGINE_BASE_PORT="${ENGINE_BASE_PORT:-8000}"
HOST="${HOST:-127.0.0.1}"

ENGINE_PID=""
FRONTEND_PID=""
STOPPED="0"

require_path() {
  local path="$1"
  local description="$2"
  if [[ ! -e "$path" ]]; then
    echo "Missing ${description}: $path" >&2
    exit 1
  fi
}

is_port_in_use() {
  local port="$1"
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

find_free_port() {
  local port="$1"
  while is_port_in_use "$port"; do
    port=$((port + 1))
  done
  echo "$port"
}

wait_for_http() {
  local url="$1"
  local name="$2"
  local attempts="${3:-60}"

  for ((i = 1; i <= attempts; i++)); do
    if curl -fsS "$url" >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done

  echo "$name did not become ready at $url" >&2
  return 1
}

cleanup() {
  if [[ "$STOPPED" == "1" ]]; then
    return
  fi
  STOPPED="1"
  echo
  echo "Stopping platform..."
  if [[ -n "$FRONTEND_PID" ]] && kill -0 "$FRONTEND_PID" >/dev/null 2>&1; then
    kill "$FRONTEND_PID" >/dev/null 2>&1 || true
  fi
  if [[ -n "$ENGINE_PID" ]] && kill -0 "$ENGINE_PID" >/dev/null 2>&1; then
    kill "$ENGINE_PID" >/dev/null 2>&1 || true
  fi
}

trap cleanup EXIT INT TERM

require_path "$FRONTEND_DIR/package.json" "frontend package.json"
require_path "$FRONTEND_DIR/prisma/schema.prisma" "Prisma schema"
require_path "$FRONTEND_DIR/.env" "frontend .env"
require_path "$ENGINE_DIR/main.py" "AI engine main.py"
require_path "$ENGINE_DIR/requirements.txt" "AI engine requirements.txt"

FRONTEND_PORT="$(find_free_port "$FRONTEND_BASE_PORT")"
ENGINE_PORT="$(find_free_port "$ENGINE_BASE_PORT")"

if [[ "$FRONTEND_PORT" != "$FRONTEND_BASE_PORT" ]]; then
  echo "Port $FRONTEND_BASE_PORT is busy. Frontend will use $FRONTEND_PORT."
fi

if [[ "$ENGINE_PORT" != "$ENGINE_BASE_PORT" ]]; then
  echo "Port $ENGINE_BASE_PORT is busy. AI engine will use $ENGINE_PORT."
fi

echo "Project root: $ROOT_DIR"
echo "Frontend root: $FRONTEND_DIR"
echo "AI engine root: $ENGINE_DIR"

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  echo "Installing frontend dependencies..."
  (cd "$FRONTEND_DIR" && npm install)
fi

if [[ ! -d "$ENGINE_VENV_DIR" ]]; then
  echo "Creating AI engine virtual environment..."
  python3 -m venv "$ENGINE_VENV_DIR"
fi

echo "Installing AI engine Python dependencies..."
"$ENGINE_PIP" install -r "$ENGINE_DIR/requirements.txt" >/dev/null

echo "Generating Prisma client..."
(cd "$FRONTEND_DIR" && DATABASE_URL="$FRONTEND_DB_URL" npm run prisma:generate >/dev/null)

echo "Applying Prisma schema to SQLite..."
(cd "$FRONTEND_DIR" && DATABASE_URL="$FRONTEND_DB_URL" npm run prisma:dbpush >/dev/null)

echo "Starting AI engine..."
(
  cd "$ENGINE_DIR"
  HOST="$HOST" PORT="$ENGINE_PORT" "$ENGINE_PYTHON" -m uvicorn main:app --host "$HOST" --port "$ENGINE_PORT"
) &
ENGINE_PID=$!

echo "Waiting for AI engine..."
wait_for_http "http://$HOST:$ENGINE_PORT/" "AI engine"

echo "Starting frontend..."
(
  cd "$FRONTEND_DIR"
  DATABASE_URL="$FRONTEND_DB_URL" \
  PORT="$FRONTEND_PORT" \
  NEXTAUTH_URL="http://$HOST:$FRONTEND_PORT" \
  NEXT_PUBLIC_APP_URL="http://$HOST:$FRONTEND_PORT" \
  AI_ENGINE_URL="http://$HOST:$ENGINE_PORT" \
  npm run dev -- --hostname "$HOST" --port "$FRONTEND_PORT"
) &
FRONTEND_PID=$!

echo "Waiting for frontend..."
wait_for_http "http://$HOST:$FRONTEND_PORT/" "Frontend"

echo
echo "Platform is running."
echo "Frontend URL: http://$HOST:$FRONTEND_PORT"
echo "AI Engine URL: http://$HOST:$ENGINE_PORT"
echo "Prisma DB: $FRONTEND_DIR/dev.db"
echo "Press Ctrl+C to stop both services."

wait
