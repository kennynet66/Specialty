describe('template spec', () => {
  it('Has a landing page', () => {
    cy.visit('/')
    cy.contains("Connect to the worlds largest pool of Specialists")
    cy.contains("Talents we offer")
  })

  it('Navigates to login from the landing page', () => {
    cy.visit('/')
    cy.contains("Connect to the worlds largest pool of Specialists")
    cy.get('[data-cy="toLogin-btn"]').click()
    cy.contains("Get back to your account")
  })
  
  it('Navigates to the signup/register page', () =>{
    cy.visit('/')
    cy.contains("Connect to the worlds largest pool of Specialists")
    cy.get('[data-cy="toRegister-btn"]').click()
    cy.contains("Join us today")
  })
})