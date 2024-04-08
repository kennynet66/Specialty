describe('login features', ()=> {
    it('Navigates to login', () => {
        cy.visit('/login')
        cy.get('[data-cy="login-email"]').type("test@cypress.io")
        cy.get('[data-cy="login-password"]').type("!Testpa$$")
    })
})