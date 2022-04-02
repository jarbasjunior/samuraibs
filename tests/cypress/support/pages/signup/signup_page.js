import { el } from './elements';

class SignupPage {
  static fillForm(user) {
    cy.get(el.fieldName).type(user.name);
    cy.get(el.fieldEmail).type(user.email);
    cy.get(el.fieldPassword).type(user.password);
  }

  static fillFormWithoutPass(user) {
    cy.get(el.fieldName).type(user.name);
    cy.get(el.fieldEmail).type(user.email);
  }

  static fillPassword(pwd) {
    cy.get(el.fieldPassword).clear().type(pwd);
  }

  static submitForm() {
    cy.contains(el.registerButton).click();
  }

  static alertHaveText(expectText) {
    cy.contains(el.alertError, expectText).should('be.visible');
  }
}

export default SignupPage;
