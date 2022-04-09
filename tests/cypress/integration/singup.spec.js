import LoginPage from '../support/pages/login/login_page';
import SignupPage from '../support/pages/signup/signup_page';
import Toast from '../support/components/toasts/toasts';
import Alert from '../support/components/alerts/alerts';
import { newUser, jarbasJunior, invalidEmail } from '../support/factories/users';

describe('Dado que acesso a página de cadastro', () => {
  context('Quando o usuário não tiver e-mail cadastrado', () => {
    before(() => cy.task('removeUser', jarbasJunior.email));

    it('Deve permitir cadastrar novo usuário com sucesso', () => {
      LoginPage.goSignupPage();
      SignupPage.fillForm(jarbasJunior);
      SignupPage.submitForm();
      Toast.mustHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
      LoginPage.mustHaveLoginForm();
    });
  });

  context('Quando usuário já tiver e-mail cadastrado', () => {
    before(() => cy.postUser(newUser));

    it('Deve proibir cadastro de novo usuário', () => {
      LoginPage.goSignupPage();
      SignupPage.fillForm(newUser);
      SignupPage.submitForm();
      Toast.mustHaveText('Email já cadastrado para outro usuário.');
      LoginPage.mustNotHaveLoginForm();
    });
  });

  context('Quando e-mail informado for inválido', () => {
    it('Deve exibir mensagem de alerta', () => {
      LoginPage.goSignupPage();
      SignupPage.fillForm(invalidEmail);
      SignupPage.submitForm();
      Alert.mustHaveText('Informe um email válido');
    });
  });

  context('Quando a senha informada for muito curta', () => {
    const shortPasswords = ['a', '1a', '1a2', '1a2#', '1a2#3'];
    before(() => {
      LoginPage.goSignupPage();
      SignupPage.fillFormWithoutPass(newUser);
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
      LoginPage.goSignupPage();
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
