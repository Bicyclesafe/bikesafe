describe("Login-redirect-tests", () => {
  it("Redirects to login if not logged in", () => {
    cy.visit("http://localhost:8080/dashboard")
    cy.get("#login-button")
  })

  it("Does not redirect to login if logged in", () => {
    cy.visit("http://localhost:8080/login")
    cy.get('#email').type('testimies@testaaja.com')
    cy.get('#password').type('testimies')
    cy.get('#login-button').click()
    cy.wait(1000)
    cy.visit("http://localhost:8080/dashboard")
    cy.wait(1000)
    cy.get("#login-button").should("not.exist")
    cy.get("#logout-button").click()
  })
})