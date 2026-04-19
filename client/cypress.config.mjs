import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    setupNodeEvents(on, config) {
      // Custom task to check environment variables
      on('task', {
        checkEnvVars() {
          return {
            serviceId: process.env.VITE_EMAILJS_SERVICE_ID || 'not-set',
            templateId: process.env.VITE_EMAILJS_TEMPLATE_IDHOME || 'not-set',
            publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || 'not-set'
          }
        },
        checkContactEnvVars() {
          return {
            serviceId: process.env.VITE_EMAILJS_SERVICE_ID || 'not-set',
            templateId: process.env.VITE_EMAILJS_TEMPLATE_ID || 'not-set',
            publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY || 'not-set'
          }
        }
      })
    },
  },
})
