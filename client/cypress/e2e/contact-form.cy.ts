describe('Contact Form - EmailJS Integration', () => {
  beforeEach(() => {
    // Visit the contact page
    cy.visit('/contact')
    
    // Wait for the page to load
    cy.get('form', { timeout: 10000 }).should('be.visible')
  })

  describe('Contact Form Display and Validation', () => {
    it('should display the contact form correctly', () => {
      cy.get('h2').should('contain.text', 'Send Us a Message')
      
      // Check if all required fields are present
      cy.get('input[name="user_name"]').should('be.visible')
      cy.get('input[name="user_email"]').should('be.visible')
      cy.get('textarea[name="message"]').should('be.visible')
      cy.get('button[type="submit"]').should('be.visible')
    })

    it('should show contact information and quick actions', () => {
      // Check contact information is displayed
      cy.contains('polly@orionstad.se').should('exist')
      cy.contains('+46 70 418 05 97').should('exist')
      cy.contains('Stockholm').should('exist')
      
      // Check quick action buttons/links
      cy.get('a[href^="mailto:"]').should('exist')
      cy.get('a[href^="tel:"]').should('exist')
      cy.get('a[href*="wa.me"]').should('exist')
    })

    it('should validate required fields', () => {
      // Try to submit empty form
      cy.get('button[type="submit"]').click()
      
      // Check HTML5 validation prevents submission
      cy.get('input[name="user_name"]:invalid').should('exist')
    })

    it('should validate email format', () => {
      // Fill form with invalid email
      cy.get('input[name="user_name"]').type('John Doe')
      cy.get('input[name="user_email"]').type('invalid-email-format')
      cy.get('textarea[name="message"]').type('This is a test message')
      
      // Try to submit
      cy.get('button[type="submit"]').click()
      
      // Should show email validation error
      cy.get('input[name="user_email"]:invalid').should('exist')
    })
  })

  describe('Contact Form Submission with EmailJS', () => {
    it('should successfully submit contact form with EmailJS (mock)', () => {
      // Mock EmailJS at the network level
      cy.mockEmailJS(true)

      // Fill out the contact form
      cy.get('input[name="user_name"]').type('John Doe')
      cy.get('input[name="user_email"]').type('john.doe@example.com')
      cy.get('textarea[name="message"]').type('Hello, I would like to inquire about your cleaning services. Please provide more information about pricing and availability.')

      // Submit the form
      cy.get('button[type="submit"]').click()

      // Check for loading state
      cy.get('button[type="submit"]').should('contain.text', 'Sending')
      cy.get('button[type="submit"]').should('be.disabled')

      // Wait for success message (SweetAlert)
      cy.get('.swal2-container', { timeout: 10000 }).should('be.visible')
      cy.get('.swal2-title').should('contain.text', 'Success')
      cy.get('.swal2-html-container').should('contain.text', 'message has been sent successfully')

      // Close success modal
      cy.get('.swal2-confirm').click()

      // Form should be reset
      cy.get('input[name="user_name"]').should('have.value', '')
      cy.get('input[name="user_email"]').should('have.value', '')
      cy.get('textarea[name="message"]').should('have.value', '')
    })

    it('should handle EmailJS errors gracefully', () => {
      // Mock EmailJS to simulate error
      cy.mockEmailJS(false)

      // Fill out the contact form
      cy.get('input[name="user_name"]').type('Jane Doe')
      cy.get('input[name="user_email"]').type('jane.doe@example.com')
      cy.get('textarea[name="message"]').type('This message should fail to send for testing purposes.')

      // Submit the form
      cy.get('button[type="submit"]').click()

      // Wait for error message
      cy.get('.swal2-container', { timeout: 10000 }).should('be.visible')
      cy.get('.swal2-title').should('contain.text', 'Error')
      cy.get('.swal2-html-container').should('contain.text', 'Failed to send')

      // Close error modal
      cy.get('.swal2-confirm').click()

      // Form should retain the data
      cy.get('input[name="user_name"]').should('have.value', 'Jane Doe')
      cy.get('input[name="user_email"]').should('have.value', 'jane.doe@example.com')
      cy.get('textarea[name="message"]').should('have.value', 'This message should fail to send for testing purposes.')
    })

    it('should handle EmailJS API failures gracefully', () => {
      // Mock EmailJS to return a server error
      cy.mockEmailJS(false)

      // Fill and submit form
      cy.get('input[name="user_name"]').type('Test User')
      cy.get('input[name="user_email"]').type('test@example.com')
      cy.get('textarea[name="message"]').type('Test message')
      
      cy.get('button[type="submit"]').click()

      // Should show error notification
      cy.get('.swal2-container', { timeout: 10000 }).should('be.visible')
      cy.get('.swal2-title').should('contain.text', 'Error')
      cy.get('.swal2-html-container').should('contain.text', 'Failed to send')
    })
  })

  describe('Contact Form Accessibility and UX', () => {
    it('should have proper form labels and accessibility', () => {
      // Check that all inputs have proper labels
      cy.get('label[for="user_name"]').should('exist')
      cy.get('label[for="user_email"]').should('exist')
      cy.get('label[for="message"]').should('exist')
      
      // Check that labels are associated with inputs
      cy.get('input[name="user_name"]').should('have.attr', 'id', 'user_name')
      cy.get('input[name="user_email"]').should('have.attr', 'id', 'user_email')
      cy.get('textarea[name="message"]').should('have.attr', 'id', 'message')
    })

    it('should show character count or limits for textarea', () => {
      const longMessage = 'A'.repeat(500)
      cy.get('textarea[name="message"]').type(longMessage)
      
      // Textarea should handle long text appropriately
      cy.get('textarea[name="message"]').should('contain.value', longMessage)
    })

    it('should be responsive on mobile devices', () => {
      // Test mobile viewport
      cy.viewport('iphone-x')
      
      // Form should still be visible and usable
      cy.get('form').should('be.visible')
      cy.get('input[name="user_name"]').should('be.visible')
      cy.get('button[type="submit"]').should('be.visible')
      
      // Form should be touch-friendly
      cy.get('input[name="user_name"]').click()
      cy.get('input[name="user_name"]').type('Mobile Test')
      cy.get('input[name="user_name"]').should('have.value', 'Mobile Test')
    })
  })

  describe('Quick Contact Actions', () => {
    it('should have working phone link', () => {
      cy.get('a[href^="tel:"]').should('have.attr', 'href').and('include', '+46')
    })

    it('should have working email link', () => {
      cy.get('a[href^="mailto:"]').should('have.attr', 'href').and('include', 'polly@orionstad.se')
    })

    it('should have working WhatsApp link', () => {
      cy.get('a[href*="wa.me"]').should('have.attr', 'href').and('include', 'wa.me')
    })
  })

  describe('Business Hours and Contact Information', () => {
    it('should display business hours', () => {
      // Look for business hours section
      cy.contains('Business Hours', { matchCase: false }).should('be.visible')
    })

    it('should display complete contact information', () => {
      // Check all contact details are present
      cy.contains('polly@orionstad.se').should('exist')
      cy.contains('+46 70 418 05 97').should('exist')
      cy.contains('Stockholm').should('exist')
    })
  })

  describe('EmailJS Environment Variables', () => {
    it('should have EmailJS environment variables configured for contact', () => {
      // Check if environment variables are available via Cypress env
      cy.task('checkContactEnvVars').then((result) => {
        const envVars = result as { serviceId: string; templateId: string; publicKey: string }
        expect(envVars.serviceId).to.exist;
        expect(envVars.templateId).to.exist;
        expect(envVars.publicKey).to.exist;
      })
    })
  })
})
