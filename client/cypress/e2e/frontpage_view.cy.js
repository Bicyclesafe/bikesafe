
describe('Frontpage-tests:', () => {
  beforeEach(() => {
    cy.request('POST', 'http:/localhost:3000/testing/reset/db')
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
  it('Market can be clicked and popup is displayed', () => {
    cy.contains('Report theft').click()
    cy.get('.leaflet-container').should('exist').click(500,200)
    cy.contains('Confirm').click()
    cy.get('.leaflet-container').should('exist').click(485,250)
    cy.contains('Täällä asuu TKT')
  })
})