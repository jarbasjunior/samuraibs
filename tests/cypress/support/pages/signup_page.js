class SignupPage {
  static fillForm(user) {
    cy.get('input[placeholder^="Nome"]').type(user.name);
    cy.get('input[placeholder$="email"]').type(user.email);
    cy.get('input[placeholder*="senha"]').type(user.password);
  }

  static submitForm() {
    cy.contains('button', 'Cadastrar').click();
  }

  static toastMustHaveText(expectText) {
    cy.get('.toast').should('be.visible').find('p').should('have.text', expectText);
  }
}

export default SignupPage;
