/// <reference types="cypress" />

context('ProjectThree', () => {
  it('successfully adds a new employee', () => {
    cy.visit('/')

    // Navigate as the user would (tests that path too, prevents accidental deep-link-only)
    cy.contains('Projects').click()
    cy.contains('Project Three').click()

    cy.get('.graph')
      .find('.node', { timeout: 60000 })
      .should('have.length', 2)

    cy.get('button[aria-label="Add new employee"').click()

    cy.get('[placeholder^="Jim"]').type('Rick')

    cy.get('select').select('Greg')

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
