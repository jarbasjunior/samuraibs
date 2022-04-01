import SigninPage from '../support/pages/signin/signin_page';
import DashHeader from '../support/components/headers/dash_header';

describe('Dado que acesso a página de login', () => {
  context.only('Quando o usuário tem cadastro', () => {
    const user = {
      name: 'Novo usuário', email: 'novo.usuario@samuraibs.com.br', password: '123456', is_provider: true,
    };

    before(() => {
      cy.task('removeUser', user.email);
      cy.request('POST', 'http://localhost:3333/users', user)
        .then((result) => expect(result.status).to.eq(200));
    });

    it('Deve fazer login com sucesso', () => {
      SigninPage.go();
      SigninPage.fillForm(user);
      SigninPage.submitForm();
      DashHeader.mustHaveName(user.name);
    });
  });
});
