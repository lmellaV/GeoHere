#!/bin/bash
set -e

# Deploy OpenNext worker to Cloudflare using direct API call
# This avoids OpenNext's remote proxy session issues in CI

ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID:-$CF_ACCOUNT_ID}"
API_TOKEN="${CLOUDFLARE_API_TOKEN:-$CF_API_TOKEN}"
WORKER_NAME="getinwork"

if [ -z "$ACCOUNT_ID" ] || [ -z "$API_TOKEN" ]; then
  echo "Error: ACCOUNT_ID or API_TOKEN not set"
  exit 1
fi

WORKER_DIR=".open-next"
WORKER_FILE="$WORKER_DIR/worker.js"

if [ ! -f "$WORKER_FILE" ]; then
  echo "Error: Worker file not found at $WORKER_FILE"
  exit 1
fi

echo "Deploying worker from $WORKER_FILE..."

# Read the worker script
WORKER_SCRIPT=$(cat "$WORKER_FILE")

# Create deployment JSON
DEPLOYMENT=$(cat <<EOF
{
  "main": "$WORKER_SCRIPT"
}
EOF
)

# Deploy using Cloudflare API v4
curl -X PUT "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME" \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$DEPLOYMENT"

echo ""
echo "Deployment complete!"
