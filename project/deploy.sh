#!/bin/bash

# Axion Platform - One-Touch Deploy Script
# Optimized for Vercel CLI & Monorepo Logic

echo "🚀 Initializing Axion Platform Deployment..."

# 1. Verify Vercel CLI
if ! command -v vercel &> /dev/null
then
    echo "❌ Error: Vercel CLI not found. Please install it: npm install -g vercel"
    exit 1
fi

# 2. Authenticate (Opens browser if needed)
echo "🔑 Checking authentication..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "⚠️ Not logged in. Please log in to Vercel:"
    vercel login
fi

# 3. Link Project (Automated)
echo "🔗 Linking platform to Vercel..."
vercel link --yes

# 4. Trigger Production Deployment
echo "📦 Building and pushing to Production..."
DEPLOY_URL=$(vercel --prod --yes)

if [ $? -eq 0 ]; then
    echo "✅ Success! Platform is LIVE."
    echo "🔗 URL: $DEPLOY_URL"
    
    # 5. Update README (If on Mac/Linux)
    if [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sed -i '' "s|\[https://axion-platform.vercel.app\]|\[$DEPLOY_URL\]|g" ../README.md
        echo "📝 README.md updated with live link."
    fi
else
    echo "❌ Deployment failed. Check the logs above."
    exit 1
fi

echo "🏁 Deployment Complete."
