import LoginPage from '../support/pages/login/login_page';
import ForgotPassPage from '../support/pages/forgot_pass/forgot_pass_page';
import ResetPassPage from '../support/pages/reset_pass/reset_pass_page';
import Toast from '../support/components/toasts/toasts';
import { recoveryUser } from '../support/factories/users';

describe('Recuperação de senha', () => {
  context('Quando usuário esquece a senha', () => {
    before(() => cy.postUser(recoveryUser));

    it('Deve permitir solicitação de recuperação por email', () => {
      LoginPage.goForgotPassPage();
      ForgotPassPage.fillEmail(recoveryUser.email);
      ForgotPassPage.recoveryPass(recoveryUser.email);
      ForgotPassPage.buttonMustdisplayLoad();
      Toast.mustHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.');
    });
  });

  context('Quando a solicitação de recuperação de senha é realizada', () => {
    before(() => {
      cy.postUser(recoveryUser);
      cy.postRecoveryPass(recoveryUser.email);
    });

    it('Deve permitir a criação de nova senha', () => {
      ResetPassPage.go(Cypress.env('recoveryToken'));
      ResetPassPage.fieldPassForm('NovaSenha', 'NovaSenha');
      ResetPassPage.resetPass();
      Toast.mustHaveText('Agora você já pode logar com a sua nova senha secreta.');
    });
  });
});
