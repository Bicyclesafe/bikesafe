describe('Login-tests:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('Login page can be opened', () => {
    cy.contains('Login')
  })

  it('Can log in when user exists ', () => {
    cy.get('#email').type('testimies@testaaja.com')
    cy.get('#password').type('testimies')
    cy.get('#login-button').click()
    cy.contains("Log out").click()
  })

  it('Cannot login with invalid email ', () => {
    cy.get('#email').type('väärä')
    cy.get('#password').type('väärä_salasana')
    cy.get('#login-button').click()
    cy.contains('Please provide a valid email')
  })

  it('Cannot login without email and password ', () => {
    cy.get('#login-button').click()
    cy.contains('Please provide a valid email')
  })

  it('Cannot login with valid email but invalid password ', () => {
    cy.get('#email').type('oikein_muotoiltu@gmail.com')
    cy.get('#password').type('123')
    cy.get('#login-button').click()
    cy.contains('Invalid email or password')
  })



})