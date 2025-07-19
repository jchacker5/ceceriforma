#!/bin/bash

# Test script for the community events cron job
# Usage: ./scripts/test-cron-job.sh [city]

BASE_URL="http://localhost:3003"
CITY=${1:-""}

echo "🧪 Testing Community Events Cron Job"
echo "📍 Testing against: $BASE_URL"
echo ""

if [ -n "$CITY" ]; then
  echo "🎯 Testing for specific city: $CITY"
  curl -X POST "$BASE_URL/api/cron/update-events" \
    -H "Content-Type: application/json" \
    -d "{\"city\": \"$CITY\"}"
else
  echo "🌍 Testing for all cities in 8th Bristol District"
  curl -X POST "$BASE_URL/api/cron/update-events" \
    -H "Content-Type: application/json" \
    -d "{}"
fi

echo -e "\n"
echo "✅ Test completed!"
echo "📊 Check the response above for results"
echo "📧 Events should now be updated in the database" 