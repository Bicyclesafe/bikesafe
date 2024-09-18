const { Marker } = require("react-leaflet")

describe('Frontpage-tests:', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
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
})