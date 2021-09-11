/// <reference types="cypress" />

context('ProjectOne', () => {
  it('successfully adds and removes BudgetItems', () => {
    cy.visit('/')

    // Navigate as the user would (tests that path too, prevents accidental deep-link-only)
    cy.contains('Projects').click()
    cy.contains('Project 1').click()

    // A bit of waiting may be needed for initial data load
    cy.get('#chart-group')
      .find('path', { timeout: 60000 })
      .should('have.length', 4)

    cy.get('#legend-group')
      .find('.cell')
      .should('have.length', 4)

    cy.get('#name').type('Oats')

    cy.get('#cost')
      .clear()
      .type(60)

    cy.get('button').click()

    cy.get('#chart-group')
      .find('path')
      .should('have.length', 5)

    cy.get('#legend-group')
      .find('.cell')
      .should('have.length', 5)

    cy.get('#chart-group')
      .find('path')
      // Seems to be the most recently added item
      .last()
      .click()

    cy.get('#chart-group')
      .find('path')
      .should('have.length', 4)

    cy.get('#legend-group')
      .find('.cell')
      .should('have.length', 4)
  })
})
