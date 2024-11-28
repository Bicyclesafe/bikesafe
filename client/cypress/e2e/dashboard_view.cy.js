describe('Frontpage-tests:', () => {
  before(() => {
    cy.visit("http://localhost:5173/login")
    cy.get('#email').type('testimies@testaaja.com')
    cy.get('#password').type('testimies')
    cy.get('#login-button').click()
    cy.wait(5000)
  })

  after(() => {
    cy.get("#logout-button").click()
  })

  it('Cycle to work button increments seasonal distance', () => {
    cy.get("#total-distance").then(($distanceDiv) => {
      const currentDistance = parseFloat($distanceDiv.text())
      const updatedDistance = (currentDistance + 20).toFixed(1)

      cy.contains("Cycle to work").click()
      cy.log(distance)
      cy.log(parseInt(distance))
      cy.contains(`${updatedDistance}km`)
    })
  })
})