#!/bin/bash

# Manual Contact API Test Script
# Run this after setting up your .env.local file and starting the dev server
# Usage: ./scripts/test-contact-manual.sh

BASE_URL="http://localhost:3000"

echo "🧪 Manual Contact API Tests"
echo "📍 Testing against: $BASE_URL"
echo ""

# Test 1: Valid submission
echo "📝 Test 1: Valid contact submission"
curl -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "555-123-4567",
    "subject": "general",
    "message": "This is a test message to verify the contact form is working properly."
  }'
echo -e "\n"

# Test 2: Honeypot (should succeed silently)
echo "📝 Test 2: Honeypot test"
curl -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spam Bot",
    "email": "spam@bot.com",
    "subject": "general",
    "message": "Spam message",
    "website": "http://spam.com"
  }'
echo -e "\n"

# Test 3: Invalid email
echo "📝 Test 3: Invalid email format"
curl -X POST "$BASE_URL/api/contact" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "subject": "general",
    "message": "Test message"
  }'
echo -e "\n"

echo "✅ Manual tests completed!"
echo "📧 If SMTP is configured, check steve@ceceriforma.com inbox for test email." 