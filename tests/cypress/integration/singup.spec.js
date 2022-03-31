describe('Dado que acesso a página de cadastro', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('a', 'Criar conta').click();
  });

  context('Quando o usuário não tiver e-mail cadastrado', () => {
    const user = { name: 'Jarbas Junior', email: 'jarbas.junior@samuraibs.com.br', password: '123456' };
    before(() => cy.task('removeUser', user.email));

    it('Deve permitir cadastrar novo usuário com sucesso', () => {
      cy.get('input[placeholder="Nome"]').type(user.name);
      cy.get('input[placeholder="E-mail"]').type(user.email);
      cy.get('input[placeholder="Senha"]').type(user.password);
      cy.contains('button', 'Cadastrar').click();

      cy.get('.toast').should('be.visible').find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!');
      cy.get('.gmtmqV').should('be.visible');
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
      cy.get('input[placeholder="Nome"]').type(user.name);
      cy.get('input[placeholder="E-mail"]').type(user.email);
      cy.get('input[placeholder="Senha"]').type(user.password);
      cy.contains('button', 'Cadastrar').click();

      cy.get('.toast').should('be.visible').find('p')
        .should('have.text', 'Email já cadastrado para outro usuário.');
      cy.get('.gmtmqV').should('not.exist');
    });
  });
});
