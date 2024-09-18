describe('Frontpage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })
  it('can be opened', () => {
    cy.contains('Report theft')
  })
  it('contains Map element',() => {
    cy.get('.leaflet-container').should('exist')
  })
})