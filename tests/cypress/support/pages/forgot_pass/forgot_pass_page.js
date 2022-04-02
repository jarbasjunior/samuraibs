import { el } from './elements';

class ForgotPassPage {
  static fillEmail(email) {
    cy.get(el.fieldEmail).clear().type(email);
  }

  static recoveryPass() {
    cy.get(el.recoveryButton).click();
  }

  static buttonMustdisplayLoad() {
    cy.get(el.recoveryButton).should('have.text', 'Carregando...');
  }
}

export default ForgotPassPage;
