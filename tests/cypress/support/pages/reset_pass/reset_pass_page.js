import { el } from './elements';

class ResetPassPage {
  static go(token) {
    cy.visit(`/reset-password?token=${token}`);
  }

  static fieldPassForm(pwd, pwd2) {
    cy.get(el.fieldNewPass).type(pwd);
    cy.get(el.fieldConfirmNewPass).type(pwd2);
  }

  static resetPass() {
    cy.get(el.resetPassButton).click();
  }
}

export default ResetPassPage;
