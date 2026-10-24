describe('EmailJS Forms Testing Example', () => {
  describe('Using Custom Commands for Easy Testing', () => {
    it('should test contact form with custom commands', () => {
      cy.visit('/contact')
      
      // Mock EmailJS at the network level
      cy.mockEmailJS(true)
      
      // Use custom command to fill contact form
      cy.fillContactForm({
        user_name: 'Test User',
        user_email: 'test@example.com',
        message: 'This is a test message for Cypress testing.'
      })
      
      // Submit and handle result
      cy.get('button[type="submit"]').click()
      cy.handleSweetAlert('success')
    })

    it('should test error handling with custom commands', () => {
      cy.visit('/contact')
      
      // Mock EmailJS to fail
      cy.mockEmailJS(false)
      
      cy.fillContactForm({
        user_name: 'Error Test',
        user_email: 'error@example.com',
        message: 'This should fail for testing.'
      })
      
      cy.get('button[type="submit"]').click()
      cy.handleSweetAlert('error')
    })
  })

  describe('Production Readiness Tests', () => {
    it('should verify all forms are properly structured', () => {
      // Verify contact form structure
      cy.visit('/contact')
      cy.get('input[name="user_name"]').should('be.visible')
      cy.get('input[name="user_email"]').should('be.visible')
      cy.get('textarea[name="message"]').should('be.visible')
    })

    it('should verify environment variables are set', () => {
      cy.task('checkContactEnvVars').then((result) => {
        const vars = result as { serviceId: string; templateId: string; publicKey: string }
        expect(vars.serviceId).to.not.equal('not-set')
        expect(vars.templateId).to.not.equal('not-set')
        expect(vars.publicKey).to.not.equal('not-set')
      })
    })
  })
})
