import Loginpage from '../support/pages/login/login_page';
import DashHeader from '../support/components/headers/dash_header';
import Toast from '../support/components/toasts/toasts';
import Alert from '../support/components/alerts/alerts';

describe('Dado que acesso a página de login', () => {
  let user;
  before(() => {
    cy.fixture('users').then((users) => {
      user = users.newUser;
      return user;
    });
  });

  context('Quando o usuário tem cadastro', () => {
    before(() => cy.postUser(user));

    it('Deve fazer login com sucesso', () => {
      Loginpage.go();
      Loginpage.fillForm(user);
      Loginpage.submitForm();
      DashHeader.mustHaveName(user.name);
    });

    after(() => cy.clearLocalStorage());
  });

  context('Quando usuário tentar fazer login com a senha errada', () => {
    before(() => {
      cy.postUser(user).then(() => {
        user.password = '654321';
      });
    });

    it('Deve exibir mensagem de erro', () => {
      Loginpage.go();
      Loginpage.fillForm(user);
      Loginpage.submitForm();
      Toast.mustHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.');
    });
  });

  context('Quando usuário tentar fazer login com e-mail inválido', () => {
    const invalidEmails = ['google.com.br', 'google.com', '@gmail.com.br', '@gmail.com', '@', '1234@', 'kldjhf2347896'];
    before(() => {
      Loginpage.go();
      Loginpage.fillPassword('123456');
    });

    invalidEmails.forEach((email) => {
      it(`Deve exibir mensagem de erro para o email |${email}|`, () => {
        Loginpage.fillEmail(email);
        Loginpage.submitForm();
      });
    });

    afterEach(() => Alert.mustHaveText('Informe um email válido'));
  });

  context('Quando campos obrigatórios estiverem ausentes', () => {
    before(() => {
      Loginpage.go();
      Loginpage.submitForm();
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
