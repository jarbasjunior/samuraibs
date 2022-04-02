import LoginPage from '../support/pages/login/login_page';
import ForgotPassPage from '../support/pages/forgot_pass/forgot_pass_page';
import Toast from '../support/components/toasts/toasts';

describe.only('Recuperação de senha', () => {
  let data;
  before(() => {
    cy.fixture('recovery_pass').then((recovery) => {
      data = recovery;
      return data;
    });
  });

  context('Quando usuário esquece a senha', () => {
    before(() => cy.postUser(data));

    it('Deve permitir solicitação de recuperação por email', () => {
      LoginPage.goForgotPassPage();
      ForgotPassPage.fillEmail(data.email);
      ForgotPassPage.recoveryPass(data.email);
      ForgotPassPage.buttonMustdisplayLoad();
      Toast.mustHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.');
    });
  });
});
