describe('Register-tests:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/register')
  })
    
  it('Register page can be opened', () => {
    cy.contains('Sign up')
  })

  /*it('User can be created', () => {
    cy.get('#email').type('testi@testi.com')
    cy.get('#password').type('123456')
    cy.get('#passwordConfirm').type('123456')
    cy.get('#register-button').click()
    cy.contains('User has been created!')
    cy.wait(3000)
    cy.contains('Login')
  })*/
  it('Cannot register when passwords dont match ', () => {
    cy.get('#email').type('testi@testi.com')
    cy.get('#password').type('1234567')
    cy.get('#passwordConfirm').type('123456')
    cy.get('#register-button').click()
    cy.contains("Passwords don't match")
  })

  it('Cannot register when passwords is too short ', () => {
    cy.get('#email').type('testi@testi.com')
    cy.get('#password').type('12345')
    cy.get('#passwordConfirm').type('12345')
    cy.get('#register-button').click()
    cy.contains('Password must be at least 6 characters long')
  })
  it('Cannot register when email is invalid ', () => {
    cy.get('#email').type('testi')
    cy.get('#password').type('123456')
    cy.get('#passwordConfirm').type('123456')
    cy.get('#register-button').click()
    cy.contains('Email is invalid')
  })

  it("Cannot register when email is already taken", () => {
    cy.get('#email').type('testimies@testaaja.com')
    cy.get('#password').type('123456')
    cy.get('#passwordConfirm').type('123456')
    cy.get('#register-button').click()
    cy.contains('Email is already in use')
  })

  it('Cannot register when email is invalid ', () => {
    cy.get('#register-button').click()
    cy.contains('Email is invalid')
    cy.contains("Password must be at least 6 characters long")
    cy.contains("Password confirmation is required")
  })
})


