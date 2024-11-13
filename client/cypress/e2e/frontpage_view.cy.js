// toistaiseksi tämä testi ohitetaan
describe.skip('Frontpage-tests:', () => {
  beforeEach(() => {
    //cy.request('POST', 'http:/localhost:3000/testing/reset/db')
    cy.visit('http://localhost:5173/login')
    cy.get('#email').type('testimies@testaaja.com')
    cy.get('#password').type('testimies')
    cy.get('#login-button').click()
    // navigoi kartalle
  })
  it('Frontpage can be opened', () => {
    cy.contains('Report theft')
  })
  it('Frontpage contains Map element',() => {
    cy.get('.leaflet-container').should('exist')
  })
  it('Marker can be placed on the map', () => {
    cy.contains('Report theft').click()
    cy.get('.leaflet-container').should('exist').click(500,300)
    cy.contains('Confirm').click()
    
  })
  it('Marker can be clicked and popup is displayed', () => {
    cy.contains('Report theft').click()
    cy.get('.leaflet-container').should('exist').click(500,200)
    cy.contains('Confirm').click()
    cy.get('.leaflet-container').should('exist').click(500,198)
    cy.contains('Täällä asuu TKT')
  })
  it('Cluster is formed when markers are close', () => {
    cy.contains('Report theft').click()
    cy.get('.leaflet-container').should('exist').click(60,24)
    cy.contains('Confirm').click()
    
    cy.contains('Cancel').click()
    cy.contains('Report theft').click()
    cy.get('.leaflet-container').should('exist').click(61,25)
    cy.contains('Confirm').click()

    cy.get('.marker-cluster').should('exist')
  })
})
