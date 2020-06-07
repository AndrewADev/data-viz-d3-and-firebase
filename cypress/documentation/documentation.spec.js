/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    Cypress.Screenshot.defaults({
      capture: 'viewport',
      clip: { x: 0, y: 0, width: 1080, height: 700 },
      scale: false,
      disableTimersAndAnimations: true,
      screenshotOnRunFailure: true,
      beforeScreenshot () { },
      afterScreenshot () { },
    })
  })

  it('captures screenshot for project one ', () => {

    cy.visit('/projects/one')
    // TODO: Can we wait on visual directly?
    cy.get('.project-header').wait(1200).screenshot('preview-project-one')
  })

  it('captures screenshot for project two ', () => {

    cy.visit('/projects/two')
    // TODO: Can we wait on visual directly?
    cy.get('.project-background').wait(1200).screenshot('preview-project-two')
  })

  //http://localhost:8080/projects/hierarchy

  it('captures screenshot for hierarchy example', () => {

    cy.visit('/projects/hierarchy')
    // TODO: Can we wait on visual directly?
    cy.get('.project-background').wait(1200).screenshot('preview-hierarchy-example')
  })

  it('captures screenshot for project three ', () => {

    cy.visit('/projects/three')
    // TODO: Can we wait on visual directly?
    cy.get('.project-background').wait(1200).screenshot('preview-project-three')
  })
})
