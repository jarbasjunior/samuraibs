import Loginpage from '../support/pages/login/login_page';
import SignupPage from '../support/pages/signup/signup_page';
import Toast from '../support/components/toasts/toasts';
import Alert from '../support/components/alerts/alerts';

describe('Dado que acesso a página de cadastro', () => {
  let user;

  context('Quando o usuário não tiver e-mail cadastrado', () => {
    before(() => {
      cy.fixture('users').then((users) => {
        user = users.jarbasJunior;
        return user;
      }).then(() => cy.task('removeUser', user.email));
    });

    it('Deve permitir cadastrar novo usuário com sucesso', () => {
      Loginpage.goSignupPage();
      SignupPage.fillForm(user);
      SignupPage.submitForm();
      Toast.mustHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
      Loginpage.musthaveLoginForm();
    });
  });

  context('Quando usuário já tiver e-mail cadastrado', () => {
    before(() => {
      cy.fixture('users').then((users) => {
        user = users.newUser;
        return user;
      }).then(() => cy.postUser(user));
    });

    it('Deve proibir cadastro de novo usuário', () => {
      Loginpage.goSignupPage();
      SignupPage.fillForm(user);
      SignupPage.submitForm();
      Toast.mustHaveText('Email já cadastrado para outro usuário.');
      Loginpage.mustNotHaveLoginForm();
    });
  });

  context('Quando e-mail informado for inválido', () => {
    before(() => {
      cy.fixture('users').then((users) => {
        user = users.invalidEmail;
        return user;
      });
    });

    it('Deve exibir mensagem de alerta', () => {
      Loginpage.goSignupPage();
      SignupPage.fillForm(user);
      SignupPage.submitForm();
      Alert.mustHaveText('Informe um email válido');
    });
  });

  context('Quando a senha informada for muito curta', () => {
    const shortPasswords = ['a', '1a', '1a2', '1a2#', '1a2#3'];
    before(() => {
      cy.fixture('users').then((users) => {
        user = users.newUser;
        return user;
      }).then(() => {
        Loginpage.goSignupPage();
        SignupPage.fillFormWithoutPass(user);
      });
    });

    shortPasswords.forEach((pwd) => {
      it(`Deve exibir mensagem de alerta com a senha |${pwd}|`, () => {
        SignupPage.fillPassword(pwd);
        SignupPage.submitForm();
      });
    });

    afterEach(() => Alert.mustHaveText('Pelo menos 6 caracteres'));
  });

  context('Quando campos obrigatórios estiverem ausentes', () => {
    before(() => {
      Loginpage.goSignupPage();
      SignupPage.submitForm();
    });

    const alertFields = [
      { field: 'Nome', message: 'Nome é obrigatório' },
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
