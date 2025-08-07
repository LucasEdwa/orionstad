# Cypress Tests for EmailJS Integration

This test suite ensures that your booking and contact forms work correctly with EmailJS before deploying to production.

## 📋 Test Overview

The test suite includes:

1. **Booking Form Tests** (`booking-form.cy.ts`)
   - Two-step booking process validation
   - EmailJS integration testing
   - Form state persistence
   - Error handling

2. **Contact Form Tests** (`contact-form.cy.ts`)
   - Contact form validation
   - EmailJS integration testing
   - Accessibility checks
   - Mobile responsiveness

3. **Integration Tests** (`integration.cy.ts`)
   - End-to-end form flows
   - Cross-page navigation
   - Security validation
   - Production readiness checks

4. **Example Usage** (`example-usage.cy.ts`)
   - Demonstrates custom commands
   - Simple test examples

## 🚀 Running the Tests

### Prerequisites

1. **Environment Variables**: Set up your EmailJS environment variables:
   ```bash
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_IDHOME=your_booking_template_id
   VITE_EMAILJS_TEMPLATE_IDCONTACT=your_contact_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

2. **Application Running**: Ensure your React app is running on `http://localhost:5173`

### Running Tests

```bash
# Run all tests in headless mode
npm run test:e2e

# Open Cypress Test Runner for interactive testing
npm run test:e2e:open

# Run specific test file
npx cypress run --spec "cypress/e2e/booking-form.cy.ts"

# Run tests with different viewport (mobile testing)
npx cypress run --config viewportWidth=375,viewportHeight=667
```

## 🎯 Test Structure

### Booking Form Tests

```typescript
describe('Booking Form - EmailJS Integration', () => {
  describe('Booking Form Step 1 - Service Selection', () => {
    // Tests for service type, home size, frequency selection
  })
  
  describe('Booking Form Step 2 - Customer Information & EmailJS', () => {
    // Tests for customer details and EmailJS submission
  })
})
```

### Key Test Scenarios

1. **Form Validation**
   - Required field validation
   - Email format validation
   - Form progression between steps

2. **EmailJS Integration**
   - Successful email submission (mocked)
   - Error handling for EmailJS failures
   - Environment variable verification

3. **User Experience**
   - Loading states during submission
   - Success/error feedback via SweetAlert
   - Form data persistence

## 🛠 Custom Commands

The test suite includes custom Cypress commands for easier testing:

```typescript
// Fill booking form (both steps)
cy.fillBookingForm(bookingData, customerData)

// Fill contact form
cy.fillContactForm(contactData)

// Mock EmailJS for testing
cy.mockEmailJS(shouldSucceed)

// Handle SweetAlert notifications
cy.handleSweetAlert('success' | 'error')
```

### Example Usage

```typescript
it('should submit booking successfully', () => {
  cy.visit('/')
  cy.mockEmailJS(true) // Mock successful EmailJS
  
  cy.fillBookingForm(
    { serviceType: 'deep', homeSize: '85', frequency: 'monthly' },
    { fullName: 'Test User', email: 'test@example.com', phone: '+46701234567', address: '123 Test St' }
  )
  
  cy.get('button[type="submit"]').click()
  cy.handleSweetAlert('success')
})
```

## 🔧 Configuration

### EmailJS Environment Variables

The tests verify that these environment variables are properly configured:

- `VITE_EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `VITE_EMAILJS_TEMPLATE_IDHOME` - Template for booking form
- `VITE_EMAILJS_TEMPLATE_IDCONTACT` - Template for contact form  
- `VITE_EMAILJS_PUBLIC_KEY` - Your EmailJS public key

### Cypress Configuration

The `cypress.config.ts` includes custom tasks for checking environment variables:

```typescript
setupNodeEvents(on, config) {
  on('task', {
    checkEnvVars() {
      return {
        serviceId: process.env.VITE_EMAILJS_SERVICE_ID || 'not-set',
        templateId: process.env.VITE_EMAILJS_TEMPLATE_IDHOME || 'not-set',
        publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || 'not-set'
      }
    }
  })
}
```

## 📱 Mobile Testing

Tests include mobile viewport testing to ensure forms work on all devices:

```typescript
cy.viewport('iphone-x')
cy.get('form').should('be.visible')
```

## 🔒 Security Testing

The test suite includes security checks for:

- XSS prevention in form inputs
- SQL injection attempt handling
- Proper input sanitization

## 🚦 CI/CD Integration

For continuous integration, add these commands to your pipeline:

```yaml
# GitHub Actions example
- name: Run Cypress Tests
  run: |
    npm run dev &
    npm run test:e2e
  env:
    VITE_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
    VITE_EMAILJS_TEMPLATE_IDHOME: ${{ secrets.EMAILJS_TEMPLATE_HOME }}
    VITE_EMAILJS_TEMPLATE_IDCONTACT: ${{ secrets.EMAILJS_TEMPLATE_CONTACT }}
    VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
```

## 📝 Test Data

### Booking Form Test Data

```typescript
const bookingData = {
  serviceType: 'deep' | 'regular' | 'move-in-out',
  homeSize: '75', // in square meters
  frequency: 'weekly' | 'bi-weekly' | 'monthly' | 'one-time'
}

const customerData = {
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '+46701234567',
  address: '123 Street, Stockholm',
  specialInstructions: 'Optional instructions'
}
```

### Contact Form Test Data

```typescript
const contactData = {
  user_name: 'Jane Doe',
  user_email: 'jane@example.com',
  message: 'Test message content'
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Tests failing due to timing**
   - Increase timeout values in test files
   - Add proper wait conditions

2. **EmailJS not mocked properly**
   - Ensure `cy.mockEmailJS()` is called before form submission
   - Check that EmailJS is loaded in the window object

3. **Environment variables not found**
   - Verify `.env` file exists and is properly configured
   - Check that variables are prefixed with `VITE_`

4. **SweetAlert not appearing**
   - Ensure SweetAlert2 is properly installed and imported
   - Check for proper CSS classes in alerts

### Debug Mode

Run tests with debug information:

```bash
DEBUG=cypress:* npx cypress run
```

## ✅ Production Checklist

Before deploying to production, ensure:

- [ ] All tests pass locally
- [ ] Environment variables are configured
- [ ] EmailJS service is set up and active
- [ ] Email templates are created and tested
- [ ] Forms work on mobile devices
- [ ] Error handling displays properly
- [ ] Success messages appear correctly

## 📚 Additional Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [SweetAlert2 Documentation](https://sweetalert2.github.io/)
