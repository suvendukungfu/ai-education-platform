#!/bin/bash

# Axion Platform - Industrial Health-Check Suite
# Verifies the readiness of the entire microservice ecosystem

echo "🏥 Probing Axion Platform Health..."

# 1. Check Postgres
echo -n "[1/5] Database Status: "
if lsof -Pi :5432 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ ONLINE"
else
    echo "⚠️ OFFLINE (Check Docker container 'axion-db')"
fi

# 2. Check Redis
echo -n "[2/5] Cache Status: "
if lsof -Pi :6379 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ ONLINE"
else
    echo "⚠️ OFFLINE (Check Docker container 'axion-cache')"
fi

# 3. Check AI Engine (FastAPI)
echo -n "[3/5] AI Orchestrator: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/ health 2>/dev/null || echo "000")
if [ "$STATUS" == "200" ]; then
    echo "✅ ONLINE"
else
    echo "❌ ERROR ($STATUS) - Check container 'axion-ai-engine'"
fi

# 4. Check Backend (Node/Prisma)
echo -n "[4/5] Platform API: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/health 2>/dev/null || echo "000")
if [ "$STATUS" == "200" ]; then
    echo "✅ ONLINE"
else
    echo "❌ ERROR ($STATUS) - Check container 'axion-backend'"
fi

# 5. Check Frontend (Next.js)
echo -n "[5/5] Visual Hub: "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/ 2>/dev/null || echo "000")
if [ "$STATUS" == "200" ]; then
    echo "✅ ONLINE"
else
    echo "❌ ERROR ($STATUS) - Check container 'axion-frontend'"
fi

echo "---"
echo "🏁 Health-check complete."
