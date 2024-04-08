describe('Register core features', () => {
    it("Navigates to register page", ()=> {
        cy.visit('/register')
        cy.get('[data-cy="register-fullName"]').type("John Doe")
        cy.get("[data-cy='register-email']").type("johndoe@cypress.io")
        cy.get("[data-cy='register-password']").type("!Pa$$w0rd")
    })
})