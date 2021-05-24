/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    Cypress.Screenshot.defaults({
      capture: 'viewport',
      clip: { x: 0, y: 0, width: 1080, height: 700 },
      scale: false,
      screenshotOnRunFailure: true,
      beforeScreenshot() {},
      afterScreenshot() {}
    });
  });

  it('captures screenshot for project one ', () => {
    cy.visit('/projects/one');

    // Initial request can sometimes take some time
    cy.get('#chart-group', { timeout: 10000 })
      .invoke('width')
      // Not great in that we have to know the styling,
      // but this gets us 95% of the way without an arbitrary
      // wait. Unfortunateley, it is still subject to variance
      // based on *how close* the animation is to finishing,
      // as both width and height stabilize before the animation
      // fully finishes (wedge-shaped gaps still closing between
      // the sections)
      // TODO: More reliable?
      .should('be.gte', 300);

    cy.get('.project-header').screenshot('preview-project-one');
  });

  it('captures screenshot for project two ', () => {
    cy.visit('/projects/two');

    // Serves as guard clause indicating that the graph has finished animating
    cy.get('.graph')
      .invoke('height')
      .should('be.gte', 310);

    cy.get('.project-background').screenshot('preview-project-two');
  });

  //http://localhost:8080/projects/hierarchy

  it('captures screenshot for hierarchy example', () => {
    cy.visit('/projects/hierarchy');
    // Currently using mocked-data, so no need
    // to wait
    cy.get('.project-background').screenshot('preview-hierarchy-example');
  });

  it('captures screenshot for project three ', () => {
    cy.visit('/projects/three');

    // Serves as guard clause indicating that the graph has finished animating
    cy.get('.graph')
      .invoke('height')
      .should('be.gte', 310);

    cy.get('.project-background').screenshot('preview-project-three');
  });
});
