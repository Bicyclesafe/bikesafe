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
    cy.contains('Report theft')
  })

  it('Cannot login with invalid user credentials ', () => {
    cy.get('#email').type('väärä@email.com')
    cy.get('#password').type('väärä_salasana')
    cy.get('#login-button').click()
    cy.contains('Invalid user credentials')
  })
})