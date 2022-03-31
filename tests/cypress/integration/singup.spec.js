it('Deve cadastrar um novo usuário', () => {
  const user = { name: 'Jarbas Junior', email: 'jarbas.junior@samuraibs.com.br' };
  cy.task('removeUser', user.email);

  cy.visit('/');
  cy.contains('a', 'Criar conta').click();

  cy.get('input[placeholder="Nome"]').type(user.name);
  cy.get('input[placeholder="E-mail"]').type(user.email);
  cy.get('input[placeholder="Senha"]').type('123456');
  cy.contains('button', 'Cadastrar').click();

  cy.get('.toast').should('be.visible').find('p')
    .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!');

  cy.get('.gmtmqV').should('be.visible');
});
