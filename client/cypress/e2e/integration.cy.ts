describe('End-to-End EmailJS Integration Tests', () => {
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

  describe('Real EmailJS Configuration Test (Production Ready)', () => {
    it('should verify forms are properly structured for EmailJS', () => {
      // Verify contact form structure
      cy.visit('/contact')
      cy.get('input[name="user_name"]').should('be.visible')
      cy.get('input[name="user_email"]').should('be.visible')
      cy.get('textarea[name="message"]').should('be.visible')
    })

    it('should have all required environment variables for production', () => {
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

      cy.visit('/contact')

      // Values should be treated as plain strings
      cy.get('input[name="user_name"]').type(sqlPayload)
      cy.get('textarea[name="message"]').type(sqlPayload)
      cy.get('input[name="user_name"]').should('have.value', sqlPayload)
      cy.get('textarea[name="message"]').should('have.value', sqlPayload)
    })
  })
})
