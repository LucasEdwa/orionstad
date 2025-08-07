/// <reference types="cypress" />

// Custom commands for Orion Städ testing
export {}

declare global {
  namespace Cypress {
    interface Chainable {
      fillBookingForm(bookingData: any, customerData: any): Chainable<void>
      fillContactForm(contactData: any): Chainable<void>
      mockEmailJS(shouldSucceed?: boolean): Chainable<void>
      handleSweetAlert(expectedType: 'success' | 'error'): Chainable<void>
    }
  }
}

// Fill booking form command
Cypress.Commands.add('fillBookingForm', (bookingData, customerData) => {
  // Step 1: Service selection
  cy.get('select[name="serviceType"]').select(bookingData.serviceType)
  cy.get('input[name="homeSize"]').type(bookingData.homeSize)
  cy.get('select[name="frequency"]').select(bookingData.frequency)
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
        cy.get('input[name="specialInstructions"]').type(customerData.specialInstructions)
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

// Mock EmailJS command
Cypress.Commands.add('mockEmailJS', (shouldSucceed = true) => {
  cy.window().then((win) => {
    const anyWin = win as any
    if (anyWin.emailjs) {
      if (shouldSucceed) {
        cy.stub(anyWin.emailjs, 'sendForm').resolves({ status: 200, text: 'OK' })
      } else {
        cy.stub(anyWin.emailjs, 'sendForm').rejects(new Error('EmailJS test error'))
      }
    }
  })
})

// Handle SweetAlert command
Cypress.Commands.add('handleSweetAlert', (expectedType) => {
  cy.get('.swal2-container', { timeout: 10000 }).should('be.visible')
  
  if (expectedType === 'success') {
    cy.get('.swal2-title').should('contain.text', 'Success')
  } else {
    cy.get('.swal2-title').should('contain.text', 'Error')
  }
  
  cy.get('.swal2-confirm').click()
})
