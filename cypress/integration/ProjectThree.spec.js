/// <reference types="cypress" />

context('ProjectThree', () => {
  it('successfully adds a new employee', () => {
    cy.visit('/')

    // Navigate as the user would (tests that path too, prevents accidental deep-link-only)
    cy.contains('Projects').click()
    cy.contains('Project 3').click()

    cy.get('.graph')
      .find('.node')
      .should('have.length', 2)

    // TODO: Could really use better attrs to query - ARIA or name?
    cy.get('button').click()

    cy.get('[placeholder^="Jim"]').type('Rick')

    cy.get('.custom-select').select('Greg')

    cy.get('[placeholder^="Sales"]')
      .clear()
      .type('Sales')

    cy.contains('Add Employee').click()

    cy.get('.graph')
      .find('.node')
      .should('have.length', 3)

    // TODO: Could verify things like:
    //  - having same color as other employees in deptment
    //  - that vertical position is same when have same manager
    //  - that vertical position is below manager
  })
})
