import { el } from './elements';

class Toast {
  static mustHaveText(expectText) {
    cy.get(el.toast, { timeout: 10000 })
      .should('be.visible')
      .should('have.css', 'opacity', '1', { timeout: 2000 })
      .find('p')
      .should('have.text', expectText);
  }
}

export default Toast;
