import { el } from './elements';

class Alert {
  static mustHaveText(expectText) {
    cy.contains(el.alertError, expectText).should('be.visible');
  }
}

export default Alert;
