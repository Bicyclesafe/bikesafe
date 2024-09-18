describe('Frontpage', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173')
    cy.contains('Report theft')
  })
})