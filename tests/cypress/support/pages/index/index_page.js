import { el } from './elements';

class IndexPage {
  static goSignupPage() {
    cy.visit('/');
    cy.contains(el.createAccountLink).click();
  }

  static musthaveLoginForm() {
    cy.get(el.loginForm).should('be.visible');
  }

  static mustNotHaveLoginForm() {
    cy.get(el.loginForm).should('not.exist');
  }
}

export default IndexPage;
