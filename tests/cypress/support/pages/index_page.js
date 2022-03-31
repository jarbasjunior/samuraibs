class IndexPage {
  static goSignupPage() {
    cy.visit('/');
    cy.contains('a', 'Criar conta').click();
  }

  static musthaveLoginForm() {
    cy.get('.gmtmqV').should('be.visible');
  }

  static mustNothaveLoginForm() {
    cy.get('.gmtmqV').should('not.exist');
  }
}

export default IndexPage;
