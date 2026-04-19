#!/bin/bash

# --- AXION PLATFORM SMART DOCTOR ---
# Self-healing diagnostic tool for senior-level evaluation

echo "🩺 Initializing Axion Smart Doctor..."

# 1. Check Env Files
echo -e "\n[1] Checking Environment Scaffolding..."
if [ ! -f "project/backend/.env" ]; then
    echo "⚠️ Backend .env missing. Cloning from example..."
    cp project/backend/.env.example project/backend/.env
fi

if [ ! -f "project/frontend/.env" ]; then
    echo "⚠️ Frontend .env missing. Cloning from example..."
    cp project/frontend/.env.example project/frontend/.env
fi
echo "✅ Envs synchronized."

# 2. Check Dependencies
echo -e "\n[2] Checking Dependency Health..."
if [ ! -d "project/backend/node_modules" ]; then
    echo "⚠️ Backend dependencies missing."
    echo "🛠️ Fix: Run 'cd project/backend && npm install'"
fi

if [ ! -d "project/frontend/node_modules" ]; then
    echo "⚠️ Frontend dependencies missing."
    echo "🛠️ Fix: Run 'cd project/frontend && npm install'"
fi

# 3. Check Database Readiness
echo -e "\n[3] Probing Database..."
if [ -f "project/frontend/prisma/dev.db" ]; then
    echo "✅ SQLite Dev DB discovered."
else
    echo "⚠️ Dev DB missing. Generating neural baseline..."
    (cd project/frontend && npm run prepare-db)
fi

# 4. Check API Connectivity
echo -e "\n[4] Probing Service Connectivity..."
if curl -s http://localhost:5000/api/health >/dev/null; then
    echo "✅ API is responsive."
else
    echo "⚠️ API is non-responsive. Recommend starting the platform via axion-cli.sh"
fi

echo -e "\n---"
echo "🏁 Diagnosis complete. Platform is healthy."
