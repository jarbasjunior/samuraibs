import { el } from './elements';

class ForgotPassPage {
  static fillEmail(email) {
    this.checkPoint();
    cy.get(el.fieldEmail).clear().type(email);
  }

  static recoveryPass() {
    cy.get(el.recoveryButton).click();
  }

  static buttonMustdisplayLoad() {
    cy.get(el.recoveryButton).should('have.text', 'Carregando...');
  }

  static checkPoint() {
    cy.contains(el.namePage).should('be.visible');
  }
}

export default ForgotPassPage;
