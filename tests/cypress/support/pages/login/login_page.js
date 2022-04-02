import { el } from './elements';

class LoginPage {
  static go() {
    cy.visit('/');
  }

  static goSignupPage() {
    this.go();
    cy.contains(el.createAccountLink).click({ force: true });
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
