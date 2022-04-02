import SigninPage from '../support/pages/signin/signin_page';
import DashHeader from '../support/components/headers/dash_header';
import Toast from '../support/components/toasts/toasts';

describe('Dado que acesso a página de login', () => {
  context('Quando o usuário tem cadastro', () => {
    const user = {
      name: 'Novo usuário', email: 'novo.usuario@samuraibs.com.br', password: '123456', is_provider: true,
    };

    before(() => cy.postUser(user));

    it('Deve fazer login com sucesso', () => {
      SigninPage.go();
      SigninPage.fillForm(user);
      SigninPage.submitForm();
      DashHeader.mustHaveName(user.name);
    });

    after(() => cy.clearLocalStorage());
  });

  context('Quando usuário tentar fazer login com a senha errada', () => {
    const user = {
      name: 'Novo usuário', email: 'novo.usuario@samuraibs.com.br', password: '123456', is_provider: true,
    };

    before(() => {
      cy.postUser(user).then(() => {
        user.password = '654321';
      });
    });

    it('Deve exibir mensagem de erro', () => {
      SigninPage.go();
      SigninPage.fillForm(user);
      SigninPage.submitForm();
      Toast.mustHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.');
    });
  });

  context('Quando usuário tentar fazer login com e-mail inválido', () => {
    const invalidEmails = ['google.com.br', 'google.com', '@gmail.com.br', '@gmail.com', '@', '1234@', 'kldjhf2347896'];
    before(() => {
      SigninPage.go();
      SigninPage.fillPassword('123456');
    });

    invalidEmails.forEach((email) => {
      it(`Deve exibir mensagem de erro para o email |${email}|`, () => {
        SigninPage.fillEmail(email);
        SigninPage.submitForm();
      });
    });

    afterEach(() => SigninPage.alertHaveText('Informe um email válido'));
  });

  context.only('Quando campos obrigatórios estiverem ausentes', () => {
    before(() => {
      SigninPage.go();
      SigninPage.submitForm();
    });

    const alertFields = [
      { field: 'Email', message: 'E-mail é obrigatório' },
      { field: 'Senha', message: 'Senha é obrigatória' },
    ];

    alertFields.forEach((alert) => {
      it(`Deve exibir mensagem |${alert.message}| campo |${alert.field}| em branco`, () => {
        SigninPage.alertHaveText(alert.message);
      });
    });
  });
});
