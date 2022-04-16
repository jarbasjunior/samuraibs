import { el } from './elements';

class LoginPage {
  static go() {
    cy.visit('/');
    cy.contains(el.namePage).should('be.visible');
  }

  static goSignupPage() {
    this.go();
    cy.contains(el.createAccountLink).click({ force: true });
  }

  static goForgotPassPage() {
    this.go();
    cy.get(el.forgotPassLink).click({ force: true });
  }

  static mustHaveLoginForm() {
    cy.get(el.loginForm).should('be.visible');
  }

  static mustNotHaveLoginForm() {
    cy.get(el.loginForm).should('not.exist');
  }

  static fillForm(user) {
    cy.get(el.fieldEmail).type(user.email);
    cy.get(el.fieldPwd).type(user.password);
  }

  static fillEmail(email) {
    cy.get(el.fieldEmail).clear().type(email);
  }

  static fillPassword(pwd) {
    cy.get(el.fieldPwd).clear().type(pwd);
  }

  static submitForm() {
    cy.contains(el.signinButton).click();
  }
}

export default LoginPage;
