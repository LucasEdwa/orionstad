/// <reference types="cypress" />

// Custom commands for Orion Home testing
export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      fillContactForm(contactData: { user_name: string; user_email: string; message: string }): Chainable<void>
      mockEmailJS(shouldSucceed?: boolean): Chainable<void>
      handleSweetAlert(expectedType: 'success' | 'error'): Chainable<void>
    }
  }
}

// Fill contact form command
Cypress.Commands.add('fillContactForm', (contactData) => {
  cy.get('input[name="user_name"]').type(contactData.user_name)
  cy.get('input[name="user_email"]').type(contactData.user_email)
  cy.get('textarea[name="message"]').type(contactData.message)
})

// Mock EmailJS command
Cypress.Commands.add('mockEmailJS', (shouldSucceed = true) => {
  cy.window().then((win) => {
    const anyWin = win as Window & { emailjs?: { sendForm: unknown } };
    if (anyWin.emailjs) {
      if (shouldSucceed) {
        cy.stub(anyWin.emailjs, 'sendForm').resolves({ status: 200, text: 'OK' })
      } else {
        cy.stub(anyWin.emailjs, 'sendForm').rejects(new Error('EmailJS test error'))
      }
    }
  })
})

// Handle Sonner toast notification
Cypress.Commands.add('handleSweetAlert', (expectedType) => {
  const selector = `[data-sonner-toast][data-type="${expectedType}"]`
  cy.get(selector, { timeout: 10000 }).should('be.visible')
})
