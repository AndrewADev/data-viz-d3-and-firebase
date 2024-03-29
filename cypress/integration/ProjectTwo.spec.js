/// <reference types="cypress" />

context('ProjectTwo', () => {
  it('successfully adds exercise entries', () => {
    cy.visit('/')

    // Navigate as the user would (tests that path too, prevents accidental deep-link-only)
    cy.contains('Projects').click()
    cy.contains('Project Two').click()

    // make sure we have the right activity
    cy.contains('Cycling').click()

    // A bit of waiting may be needed for initial data load
    cy.get('svg')
      .find('circle', { timeout: 10000 })
      .should('have.length', 4)

    cy.get('#cycling')
      .type(17500)
      .type('{enter}')

    cy.get('svg')
      .find('circle', { timeout: 10000 })
      .should('have.length', 5)

    cy.contains('Swimming').click()

    cy.get('svg')
      .find('circle')
      .should('have.length', 4)

    cy.get('#swimming')
      .type(1500)
      .type('{enter}')

    cy.get('svg')
      .find('circle')
      .should('have.length', 5)
  })
})
