import { el } from './elements';

class DashHeader {
  static mustHaveName(userName) {
    cy.get(el.userName).should('have.text', userName);
  }
}

export default DashHeader;
