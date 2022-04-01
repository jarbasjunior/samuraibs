import IndexPage from '../support/pages/index/index_page';
import SignupPage from '../support/pages/signup/signup_page';

describe('Dado que acesso a página de cadastro', () => {
  beforeEach(() => {
    IndexPage.goSignupPage();
  });

  context('Quando o usuário não tiver e-mail cadastrado', () => {
    const user = { name: 'Jarbas Junior', email: 'jarbas.junior@samuraibs.com.br', password: '123456' };
    before(() => cy.task('removeUser', user.email));

    it('Deve permitir cadastrar novo usuário com sucesso', () => {
      SignupPage.fillForm(user);
      SignupPage.submitForm();
      SignupPage.toastMustHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
      IndexPage.musthaveLoginForm();
    });
  });

  context('Quando usuário já tiver e-mail cadastrado', () => {
    const user = {
      name: 'Novo usuário', email: 'novo.usuario@samuraibs.com.br', password: '123456', is_provider: true,
    };
    before(() => {
      cy.task('removeUser', user.email);
      cy.request('POST', 'http://localhost:3333/users', user)
        .then((result) => expect(result.status).to.eq(200));
    });

    it('Deve proibir cadastro de novo usuário', () => {
      SignupPage.fillForm(user);
      SignupPage.submitForm();
      SignupPage.toastMustHaveText('Email já cadastrado para outro usuário.');
      IndexPage.mustNothaveLoginForm();
    });
  });
});