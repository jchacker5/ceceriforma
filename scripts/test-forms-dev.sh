#!/bin/bash

# Test Forms in Dev Environment
# Run this script to verify all forms work before pushing schema to Supabase

set -e

echo "🧪 Testing Forms in Dev Environment"
echo "=================================="

# Check if dev server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Dev server not running on localhost:3000"
    echo "   Please start with: pnpm dev"
    exit 1
fi

echo "✅ Dev server is running"

# Check environment variables
echo ""
echo "🔍 Checking Environment Variables..."

required_vars=(
    "POSTGRES_URL"
    "STRIPE_SECRET_KEY"
    "SMTP_HOST"
    "SMTP_USER"
    "SMTP_PASS"
    "CONTACT_TO"
    "CONTACT_FROM"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        missing_vars+=("$var")
    else
        echo "✅ $var is set"
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "❌ Missing environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please check your .env.local file"
    exit 1
fi

echo ""
echo "✅ All required environment variables are set"

# Run existing tests
echo ""
echo "🧪 Running Existing Tests..."
pnpm test:contact

# Test database connection
echo ""
echo "🗄️  Testing Database Connection..."
node -e "
const { db } = require('./lib/db/index.ts');
(async () => {
  try {
    await db.execute('SELECT 1');
    console.log('✅ Database connection successful');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
})();
"

# Test Stripe connection
echo ""
echo "💳 Testing Stripe Connection..."
node -e "
const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-06-30.basil',
});
(async () => {
  try {
    await stripe.paymentMethods.list({ limit: 1 });
    console.log('✅ Stripe connection successful');
  } catch (error) {
    console.error('❌ Stripe connection failed:', error.message);
    process.exit(1);
  }
})();
"

echo ""
echo "🎉 All pre-flight checks passed!"
echo ""
echo "Next steps:"
echo "1. Test forms manually in browser at http://localhost:3000"
echo "2. Check each form submission works correctly"
echo "3. Verify data is saved to database (if applicable)"
echo "4. Run: pnpm db:generate to generate migration"
echo "5. Run: pnpm db:migrate to apply schema changes" 