import SigninPage from '../support/pages/signin/signin_page';
import DashHeader from '../support/components/headers/dash_header';
import Toast from '../support/components/toasts/toasts';
import Alert from '../support/components/alerts/alerts';

describe('Dado que acesso a página de login', () => {
  let newUser;
  before(() => {
    cy.fixture('body_new_user').then((user) => {
      newUser = user;
      return newUser;
    });
  });

  context('Quando o usuário tem cadastro', () => {
    before(() => cy.postUser(newUser));

    it('Deve fazer login com sucesso', () => {
      SigninPage.go();
      SigninPage.fillForm(newUser);
      SigninPage.submitForm();
      DashHeader.mustHaveName(newUser.name);
    });

    after(() => cy.clearLocalStorage());
  });

  context('Quando usuário tentar fazer login com a senha errada', () => {
    before(() => {
      cy.postUser(newUser).then(() => {
        newUser.password = '654321';
      });
    });

    it('Deve exibir mensagem de erro', () => {
      SigninPage.go();
      SigninPage.fillForm(newUser);
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

    afterEach(() => Alert.mustHaveText('Informe um email válido'));
  });

  context('Quando campos obrigatórios estiverem ausentes', () => {
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
        Alert.mustHaveText(alert.message);
      });
    });
  });
});
