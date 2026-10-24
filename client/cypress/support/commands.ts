/// <reference types="cypress" />

// Custom commands for Orion Home testing
export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      fillContactForm(contactData: { user_name: string; user_email: string; message: string }): Chainable<void>
      mockEmailJS(shouldSucceed?: boolean): Chainable<void>
      handleToast(expectedType: 'success' | 'error'): Chainable<void>
      /** @deprecated Use handleToast instead */
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

// Mock EmailJS at the network level using cy.intercept
Cypress.Commands.add('mockEmailJS', (shouldSucceed = true) => {
  if (shouldSucceed) {
    cy.intercept('POST', 'https://api.emailjs.com/**', {
      statusCode: 200,
      body: 'OK',
      delay: 200
    }).as('emailjsRequest')
  } else {
    cy.intercept('POST', 'https://api.emailjs.com/**', {
      statusCode: 422,
      body: 'The Public Key is required',
      delay: 200
    }).as('emailjsRequest')
  }
})

// Handle Sonner toast notification
Cypress.Commands.add('handleToast', (expectedType) => {
  const selector = `[data-sonner-toast][data-type="${expectedType}"]`
  cy.get(selector, { timeout: 10000 }).should('be.visible')
})

// Legacy alias for backward compatibility
Cypress.Commands.add('handleSweetAlert', (expectedType) => {
  const selector = `[data-sonner-toast][data-type="${expectedType}"]`
  cy.get(selector, { timeout: 10000 }).should('be.visible')
})
