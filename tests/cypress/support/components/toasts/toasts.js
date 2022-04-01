import { el } from './elements';

class Toast {
  static mustHaveText(expectText) {
    cy.get(el.toast).should('be.visible').find('p').should('have.text', expectText);
  }
}

export default Toast;
