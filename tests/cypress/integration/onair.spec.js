it('Webapp deve estar online', () => {
  cy.visit('/');
  cy.title().should('eq', 'Samurai Barbershop by QAninja');
});
