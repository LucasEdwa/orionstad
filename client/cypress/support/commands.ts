/// <reference types="cypress" />

// Custom commands for Orion Städ testing
export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      selectDropdown(dropdownId: string, optionValue: string): Chainable<void>
      fillBookingForm(bookingData: { serviceType: string; homeSize: string; frequency: string }, customerData: { fullName: string; email: string; phone: string; address: string; specialInstructions?: string }): Chainable<void>
      fillContactForm(contactData: { user_name: string; user_email: string; message: string }): Chainable<void>
      mockEmailJS(shouldSucceed?: boolean): Chainable<void>
      handleToast(expectedType: 'success' | 'error'): Chainable<void>
      /** @deprecated Use handleToast instead */
      handleSweetAlert(expectedType: 'success' | 'error'): Chainable<void>
    }
  }
}

// Select an option from the custom Dropdown component
Cypress.Commands.add('selectDropdown', (dropdownId: string, optionValue: string) => {
  cy.get(`button[aria-controls="${dropdownId}-dropdown"]`).click()
  cy.get(`#${dropdownId}-dropdown [data-value="${optionValue}"]`).click()
})

// Fill booking form command
Cypress.Commands.add('fillBookingForm', (bookingData, customerData) => {
  // Step 1: Service selection using custom dropdowns
  cy.get('#booking', { timeout: 10000 }).should('be.visible')
  cy.selectDropdown('service', bookingData.serviceType)
  cy.get('input[name="homeSize"]').clear().type(bookingData.homeSize)
  cy.selectDropdown('frequency', bookingData.frequency)
  cy.get('button[type="submit"]').click()

  // Step 2: Customer information
  cy.get('input[name="fullName"]', { timeout: 5000 }).should('be.visible')
  cy.get('input[name="fullName"]').type(customerData.fullName)
  cy.get('input[name="email"]').type(customerData.email)
  cy.get('input[name="phone"]').type(customerData.phone)
  cy.get('input[name="address"]').type(customerData.address)

  // Optional fields
  if (customerData.specialInstructions) {
    cy.get('body').then(($body) => {
      if ($body.find('input[name="specialInstructions"]').length > 0) {
        cy.get('input[name="specialInstructions"]').type(customerData.specialInstructions!)
      }
    })
  }
})

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
