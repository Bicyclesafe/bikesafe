describe('Login-tests:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/login')
  })

  it('Login page can be opened', () => {
    cy.contains('Login')
  })

  it('Can log in when user exists ', () => {
    cy.get('#email').type('testimies@testaaja.com')
    cy.get('#password').type('testimies')
    cy.get('#login-button').click()
    cy.contains('Dashboard')
    cy.contains("Log out").click()
  })

  it('Cannot login with invalid user credentials ', () => {
    cy.get('#email').type('väärä@email.com')
    cy.get('#password').type('väärä_salasana')
    cy.get('#login-button').click()
    cy.contains('Invalid email or password')
  })
})