describe('Logout-tests:', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/login')
    })
      
    it('Can log out when user logged in', () => {
      cy.get('#email').type('testimies@testaaja.com')
      cy.get('#password').type('testimies')
      cy.get('#login-button').click()
      cy.get("#logout-button").click()
    })

    it("Log out button is not visible when not logged in", () => {
        cy.get("#logout-button").should("not.exist")
    })
  })