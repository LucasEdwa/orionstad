describe('Booking Form - EmailJS Integration', () => {
  beforeEach(() => {
    // Visit the home page where the booking form is located
    cy.visit('/')
    
    // Wait for the booking section to load
    cy.get('#booking', { timeout: 10000 }).should('be.visible')
  })

  describe('Booking Form Step 1 - Service Selection', () => {
    it('should display the initial booking form correctly', () => {
      cy.get('h2').should('contain.text', 'Book a Cleaning Service')
      
      // Check if custom dropdowns and input are present
      cy.get('button[aria-controls="service-dropdown"]').should('be.visible')
      cy.get('input[name="homeSize"]').should('be.visible')
      cy.get('button[aria-controls="frequency-dropdown"]').should('be.visible')
    })

    it('should validate required fields before proceeding to step 2', () => {
      // Try to submit without filling homeSize (required field)
      cy.get('button[type="submit"]').click()
      
      // Form should not proceed to step 2 due to HTML5 validation
      cy.get('h2').should('contain.text', 'Book a Cleaning Service')
    })

    it('should proceed to step 2 when all fields are filled correctly', () => {
      // Fill out step 1 form using custom dropdowns
      cy.selectDropdown('service', 'deep')
      cy.get('input[name="homeSize"]').type('85')
      cy.selectDropdown('frequency', 'bi-weekly')
      
      // Submit step 1
      cy.get('button[type="submit"]').click()
      
      // Should proceed to step 2
      cy.get('h2').should('contain.text', 'Customer Information')
    })
  })

  describe('Booking Form Step 2 - Customer Information & EmailJS', () => {
    beforeEach(() => {
      // Fill step 1 to get to step 2
      cy.selectDropdown('service', 'regular')
      cy.get('input[name="homeSize"]').type('75')
      cy.selectDropdown('frequency', 'weekly')
      cy.get('button[type="submit"]').click()
      
      // Wait for step 2 to load
      cy.get('input[name="fullName"]', { timeout: 5000 }).should('be.visible')
    })

    it('should display step 2 form with all customer fields', () => {
      // Check if all customer information fields are present
      cy.get('input[name="fullName"]').should('be.visible')
      cy.get('input[name="email"]').should('be.visible')
      cy.get('input[name="phone"]').should('be.visible')
      cy.get('input[name="address"]').should('be.visible')
      
      // Check for minimum number of form inputs
      cy.get('form').within(() => {
        cy.get('input, textarea').should('have.length.at.least', 4)
      })
    })

    it('should validate email format', () => {
      // Fill required fields with invalid email
      cy.get('input[name="fullName"]').type('John Doe')
      cy.get('input[name="email"]').type('invalid-email')
      cy.get('input[name="phone"]').type('+46701234567')
      cy.get('input[name="address"]').type('123 Test Street, Stockholm')
      
      // Try to submit
      cy.get('button[type="submit"]').click()
      
      // Should show validation error
      cy.get('input[name="email"]:invalid').should('exist')
    })

    it('should go back to step 1 when back button is clicked', () => {
      // Click back button
      cy.contains('button', 'Back', { matchCase: false }).click()
      
      // Should be back at step 1
      cy.get('h2').should('contain.text', 'Book a Cleaning Service')
      cy.get('button[aria-controls="service-dropdown"]').should('contain.text', 'Regular Cleaning')
    })

    it('should successfully submit booking form with EmailJS (mock)', () => {
      // Mock EmailJS at the network level
      cy.mockEmailJS(true)

      // Fill out all required customer information
      cy.get('input[name="fullName"]').type('John Doe')
      cy.get('input[name="email"]').type('john.doe@example.com')
      cy.get('input[name="phone"]').type('+46701234567')
      cy.get('input[name="address"]').type('123 Test Street, 123 45 Stockholm')

      // Fill optional fields if they exist
      cy.get('body').then(($body) => {
        if ($body.find('input[name="specialInstructions"]').length > 0) {
          cy.get('input[name="specialInstructions"]').type('Please use eco-friendly products')
        }
        if ($body.find('input[name="accessInstructions"]').length > 0) {
          cy.get('input[name="accessInstructions"]').type('Key under the mat')
        }
      })

      // Submit the form
      cy.get('button[type="submit"]').click()

      // Check for loading state
      cy.get('button[type="submit"]').should('contain.text', 'Sending')
      cy.get('button[type="submit"]').should('be.disabled')

      // Wait for success toast (Sonner)
      cy.get('[data-sonner-toast][data-type="success"]', { timeout: 10000 }).should('be.visible')

      // Should reset to step 1
      cy.get('h2').should('contain.text', 'Book a Cleaning Service')
    })

    it('should handle EmailJS errors gracefully', () => {
      // Mock EmailJS to simulate error
      cy.mockEmailJS(false)

      // Fill out form
      cy.get('input[name="fullName"]').type('Jane Doe')
      cy.get('input[name="email"]').type('jane.doe@example.com')
      cy.get('input[name="phone"]').type('+46709876543')
      cy.get('input[name="address"]').type('456 Error Street, 654 32 Stockholm')

      // Submit the form
      cy.get('button[type="submit"]').click()

      // Wait for error toast (Sonner)
      cy.get('[data-sonner-toast][data-type="error"]', { timeout: 10000 }).should('be.visible')

      // Should remain on step 2
      cy.get('h2').should('contain.text', 'Customer Information')
    })

    it('should retain form data when navigating between steps', () => {
      // Fill some customer data
      cy.get('input[name="fullName"]').type('Test User')
      cy.get('input[name="email"]').type('test@example.com')

      // Go back to step 1
      cy.contains('button', 'Back', { matchCase: false }).click()

      // Verify step 1 data is retained
      cy.get('button[aria-controls="service-dropdown"]').should('contain.text', 'Regular Cleaning')
      cy.get('input[name="homeSize"]').should('have.value', '75')
      cy.get('button[aria-controls="frequency-dropdown"]').should('contain.text', 'Weekly Cleaning')

      // Go back to step 2
      cy.get('button[type="submit"]').click()

      // Verify step 2 data is retained
      cy.get('input[name="fullName"]').should('have.value', 'Test User')
      cy.get('input[name="email"]').should('have.value', 'test@example.com')
    })
  })

  describe('EmailJS Environment Variables', () => {
    it('should have EmailJS environment variables configured', () => {
      // Check if environment variables are available via Cypress env
      // These should be set in cypress.config.ts or via CI/CD
      cy.task('checkEnvVars').then((result) => {
        const envVars = result as { serviceId: string; templateId: string; publicKey: string }
        expect(envVars.serviceId).to.exist;
        expect(envVars.templateId).to.exist;
        expect(envVars.publicKey).to.exist;
      })
    })
  })
})
