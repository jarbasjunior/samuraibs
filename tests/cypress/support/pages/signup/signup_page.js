import { el } from './elements';

class SignupPage {
  static fillForm(user) {
    this.checkPoint();
    cy.get(el.fieldName).type(user.name);
    cy.get(el.fieldEmail).type(user.email);
    cy.get(el.fieldPassword).type(user.password);
  }

  static fillFormWithoutPass(user) {
    this.checkPoint();
    cy.get(el.fieldName).type(user.name);
    cy.get(el.fieldEmail).type(user.email);
  }

  static fillPassword(pwd) {
    this.checkPoint();
    cy.get(el.fieldPassword).clear().type(pwd);
  }

  static submitForm() {
    this.checkPoint();
    cy.contains(el.registerButton).click();
  }

  static checkPoint() {
    cy.contains(el.namePage).should('be.visible');
  }
}

export default SignupPage;
