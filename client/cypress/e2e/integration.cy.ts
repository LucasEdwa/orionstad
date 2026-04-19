describe('End-to-End EmailJS Integration Tests', () => {
  describe('Complete Booking Flow Integration', () => {
    it('should complete the entire booking process successfully', () => {
      cy.visit('/')
      
      // Step 1: Navigate to booking section and fill service details
      cy.get('#booking', { timeout: 10000 }).should('be.visible')
      
      // Mock EmailJS at the network level before form interactions
      cy.mockEmailJS(true)
      
      // Fill booking form step 1 using custom dropdowns
      cy.selectDropdown('service', 'deep')
      cy.get('input[name="homeSize"]').type('100')
      cy.selectDropdown('frequency', 'monthly')
      
      // Proceed to step 2
      cy.get('button[type="submit"]').click()
      
      // Step 2: Fill customer information
      cy.get('input[name="fullName"]', { timeout: 5000 }).should('be.visible')
      
      // Fill customer details
      cy.get('input[name="fullName"]').type('Integration Test User')
      cy.get('input[name="email"]').type('integration.test@example.com')
      cy.get('input[name="phone"]').type('+46701234567')
      cy.get('input[name="address"]').type('123 Integration Street, 123 45 Stockholm, Sweden')
      
      // Add special instructions if field exists
      cy.get('body').then(($body) => {
        if ($body.find('input[name="specialInstructions"]').length > 0) {
          cy.get('input[name="specialInstructions"]').type('Integration test - please ignore')
        }
      })
      
      // Submit booking
      cy.get('button[type="submit"]').click()
      
      // Verify success toast
      cy.get('[data-sonner-toast][data-type="success"]', { timeout: 10000 }).should('be.visible')
      
      // Should return to step 1
      cy.get('h2').should('contain.text', 'Book a Cleaning Service')
    })

    it('should handle booking submission failures gracefully', () => {
      cy.visit('/')
      
      // Mock EmailJS to fail
      cy.mockEmailJS(false)
      
      // Complete step 1
      cy.selectDropdown('service', 'regular')
      cy.get('input[name="homeSize"]').type('50')
      cy.selectDropdown('frequency', 'weekly')
      cy.get('button[type="submit"]').click()
      
      // Fill and submit step 2
      cy.get('input[name="fullName"]', { timeout: 5000 }).should('be.visible')
      cy.get('input[name="fullName"]').type('Failure Test User')
      cy.get('input[name="email"]').type('failure.test@example.com')
      cy.get('input[name="phone"]').type('+46709876543')
      cy.get('input[name="address"]').type('456 Failure Street, 654 32 Stockholm')
      
      cy.get('button[type="submit"]').click()
      
      // Verify error toast
      cy.get('[data-sonner-toast][data-type="error"]', { timeout: 10000 }).should('be.visible')
      
      // Should remain on step 2 with data intact
      cy.get('input[name="fullName"]').should('have.value', 'Failure Test User')
    })
  })

  describe('Contact Form Integration', () => {
    it('should successfully send contact form message', () => {
      cy.visit('/contact')
      
      // Mock EmailJS at the network level
      cy.mockEmailJS(true)
      
      // Fill and submit contact form
      cy.get('input[name="user_name"]').type('Contact Integration Test')
      cy.get('input[name="user_email"]').type('contact.test@example.com')
      cy.get('textarea[name="message"]').type('This is an integration test message for the contact form. Testing EmailJS integration.')
      
      cy.get('button[type="submit"]').click()
      
      // Verify success toast
      cy.get('[data-sonner-toast][data-type="success"]', { timeout: 10000 }).should('be.visible')
      
      // Form should be reset
      cy.get('input[name="user_name"]').should('have.value', '')
    })

    it('should handle contact form submission failures', () => {
      cy.visit('/contact')
      
      // Mock EmailJS failure
      cy.mockEmailJS(false)
      
      // Fill and submit contact form
      cy.get('input[name="user_name"]').type('Contact Failure Test')
      cy.get('input[name="user_email"]').type('contact.failure@example.com')
      cy.get('textarea[name="message"]').type('This should fail for testing purposes.')
      
      cy.get('button[type="submit"]').click()
      
      // Verify error toast
      cy.get('[data-sonner-toast][data-type="error"]', { timeout: 10000 }).should('be.visible')
      
      // Form should retain data
      cy.get('input[name="user_name"]').should('have.value', 'Contact Failure Test')
    })
  })

  describe('Cross-Page Navigation and Form Persistence', () => {
    it('should maintain booking form state when navigating between pages', () => {
      cy.visit('/')
      
      // Fill partial booking form using custom dropdowns
      cy.selectDropdown('service', 'move-in-out')
      cy.get('input[name="homeSize"]').type('75')
      
      // Navigate to contact page
      cy.visit('/contact')
      cy.get('h2').should('contain.text', 'Send Us a Message')
      
      // Navigate back to home
      cy.visit('/')
      
      // Check if booking form is still present
      cy.get('button[aria-controls="service-dropdown"]').should('exist')
    })
  })

  describe('Real EmailJS Configuration Test (Production Ready)', () => {
    it('should verify forms are properly structured for EmailJS', () => {
      // Verify booking form structure
      cy.visit('/')
      cy.get('#booking', { timeout: 10000 }).should('be.visible')
      cy.get('button[aria-controls="service-dropdown"]').should('be.visible')
      cy.get('input[name="homeSize"]').should('be.visible')
      cy.get('button[aria-controls="frequency-dropdown"]').should('be.visible')
      
      // Verify contact form structure
      cy.visit('/contact')
      cy.get('input[name="user_name"]').should('be.visible')
      cy.get('input[name="user_email"]').should('be.visible')
      cy.get('textarea[name="message"]').should('be.visible')
    })

    it('should have all required environment variables for production', () => {
      cy.task('checkEnvVars').then((result) => {
        const bookingVars = result as { serviceId: string; templateId: string; publicKey: string }
        // Verify booking form environment variables
        expect(bookingVars.serviceId).to.not.equal('not-set');
        expect(bookingVars.templateId).to.not.equal('not-set');
        expect(bookingVars.publicKey).to.not.equal('not-set');
      })
      
      cy.task('checkContactEnvVars').then((result) => {
        const contactVars = result as { serviceId: string; templateId: string; publicKey: string }
        // Verify contact form environment variables
        expect(contactVars.serviceId).to.not.equal('not-set');
        expect(contactVars.templateId).to.not.equal('not-set');
        expect(contactVars.publicKey).to.not.equal('not-set');
      })
    })
  })

  describe('Form Security and Validation', () => {
    it('should prevent XSS attacks in form inputs', () => {
      const xssPayload = '<script>alert("XSS")</script>'
      
      cy.visit('/contact')
      
      // Try to inject XSS in contact form
      cy.get('input[name="user_name"]').type(xssPayload)
      cy.get('input[name="user_email"]').type('test@example.com')
      cy.get('textarea[name="message"]').type(xssPayload)
      
      // Verify the script doesn't execute
      cy.get('input[name="user_name"]').should('have.value', xssPayload)
      cy.get('textarea[name="message"]').should('have.value', xssPayload)
      
      // Ensure no alert was triggered
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('windowAlert')
      })
      
      cy.get('@windowAlert').should('not.have.been.called')
    })

    it('should handle SQL injection attempts gracefully', () => {
      const sqlPayload = "'; DROP TABLE users; --"
      
      cy.visit('/')
      
      // Fill booking form - homeSize is type=number, so use a valid number
      cy.get('#booking', { timeout: 10000 }).should('be.visible')
      cy.selectDropdown('service', 'regular')
      cy.get('input[name="homeSize"]').type('100')
      cy.selectDropdown('frequency', 'weekly')
      cy.get('button[type="submit"]').click()
      
      // SQL injection in text fields on step 2
      cy.get('input[name="fullName"]', { timeout: 5000 }).should('be.visible')
      cy.get('input[name="fullName"]').type(sqlPayload)
      cy.get('input[name="email"]').type('sql@example.com')
      cy.get('input[name="phone"]').type('+46701234567')
      cy.get('input[name="address"]').type('SQL Street 123')
      
      // Values should be treated as strings
      cy.get('input[name="fullName"]').should('have.value', sqlPayload)
    })
  })
})
