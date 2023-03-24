describe('Login', () => {
  it.only('should login successfully', () => {
    cy.visit('http://localhost:3000/login'); // Visita a página de login da aplicação
    
    cy.get('#email').type('teste@uorak.com'); // Preenche o campo de email
    cy.get('#password').type('1234'); // Preenche o campo de senha
    
    cy.get('#submit').click(); // Envia o formulário
    
    cy.url().should('include', '/home'); // Verifica se o usuário foi redirecionado para a página de dashboard
    //cy.contains('Seja bem vindo, Joao Silva!'); // Verifica se a mensagem de boas-vindas é exibida na página
  })
  it('should login failed', () => {
    cy.visit('http://localhost:3000/login'); // Visita a página de login da aplicação
    
    cy.get('#email').type('naoexiste@uorak.com'); // Preenche o campo de email
    cy.get('#password').type('1234'); // Preenche o campo de senha
    
    cy.get('#submit').click(); // Envia o formulário
    
    //cy.url().should('include', '/home'); // Verifica se o usuário foi redirecionado para a página de dashboard
    cy.contains('Usuário não encontrado!'); // Verifica se a mensagem de boas-vindas é exibida na página
  })
})
