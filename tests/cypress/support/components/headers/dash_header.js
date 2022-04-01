import { el } from './elements';

class DashHeader {
  static mustHaveName(userName) {
    cy.get(el.userName, { timeout: 10000 }).should('have.text', userName);
  }
}

export default DashHeader;
