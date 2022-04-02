import { el } from './elements';

class SigninPage {
  static go() {
    cy.visit('/');
  }

  static goSignupPage() {
    this.go();
    cy.contains(el.createAccountLink).click();
  }

  static musthaveLoginForm() {
    cy.get(el.loginForm).should('be.visible');
  }

  static mustNotHaveLoginForm() {
    cy.get(el.loginForm).should('not.exist');
  }

  static fillForm(user) {
    cy.get(el.fieldEmail).type(user.email);
    cy.get(el.fieldPwd).type(user.password);
  }

  static submitForm() {
    cy.contains(el.signinButton).click();
  }
}

export default SigninPage;