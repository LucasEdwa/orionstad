#!/bin/bash
# Test runner script for EmailJS integration tests

echo "🧪 EmailJS Integration Test Suite"
echo "=================================="

# Check if app is running
if ! curl -s http://localhost:5173 > /dev/null; then
    echo "❌ Application is not running on http://localhost:5173"
    echo "Please start your development server with: npm run dev"
    exit 1
fi

echo "✅ Application is running"

# Check if environment variables are set
if [[ -z "$VITE_EMAILJS_SERVICE_ID" ]]; then
    echo "⚠️  Warning: VITE_EMAILJS_SERVICE_ID not set"
fi

if [[ -z "$VITE_EMAILJS_TEMPLATE_IDHOME" ]]; then
    echo "⚠️  Warning: VITE_EMAILJS_TEMPLATE_IDHOME not set"
fi

if [[ -z "$VITE_EMAILJS_TEMPLATE_IDCONTACT" ]]; then
    echo "⚠️  Warning: VITE_EMAILJS_TEMPLATE_IDCONTACT not set"
fi

if [[ -z "$VITE_EMAILJS_PUBLIC_KEY" ]]; then
    echo "⚠️  Warning: VITE_EMAILJS_PUBLIC_KEY not set"
fi

echo ""
echo "Running Cypress tests..."

# Check if Cypress is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js"
    exit 1
fi

# Run tests based on argument
if [[ "$1" == "open" ]]; then
    echo "🔍 Opening Cypress Test Runner..."
    npx cypress open
elif [[ "$1" == "booking" ]]; then
    echo "📋 Running booking form tests..."
    npx cypress run --spec "cypress/e2e/booking-form.cy.ts"
elif [[ "$1" == "contact" ]]; then
    echo "📞 Running contact form tests..."
    npx cypress run --spec "cypress/e2e/contact-form.cy.ts"
elif [[ "$1" == "integration" ]]; then
    echo "🔗 Running integration tests..."
    npx cypress run --spec "cypress/e2e/integration.cy.ts"
elif [[ "$1" == "example" ]]; then
    echo "📖 Running example tests..."
    npx cypress run --spec "cypress/e2e/example-usage.cy.ts"
else
    echo "🚀 Running all tests..."
    npx cypress run
fi

echo ""
echo "✅ Test run completed!"
echo ""
echo "Usage:"
echo "  ./test-emailjs.sh open       - Open Cypress Test Runner"
echo "  ./test-emailjs.sh booking    - Run booking form tests"
echo "  ./test-emailjs.sh contact    - Run contact form tests"
echo "  ./test-emailjs.sh integration - Run integration tests"
echo "  ./test-emailjs.sh example    - Run example tests"
echo "  ./test-emailjs.sh           - Run all tests"
