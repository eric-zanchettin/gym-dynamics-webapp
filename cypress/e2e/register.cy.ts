describe('Register', () => {
    it('should register successfully', () => {
      cy.visit('http://localhost:3000/login'); // Visita a página de login da aplicação
      
      cy.contains('Registre-se').click();
      cy.get('#name').type('Madalena'); // Preenche o campo de nome
      cy.get('#email-register').type('madalena5@teste.com'); // Preenche o campo de email
      cy.get('#pass-register').type('1234'); // Preenche o campo de senha
      
      cy.get('#submit-register').click(); // Envia o formulário
      
      //cy.url().should('include', '/home'); // Verifica se o usuário foi redirecionado para a página de dashboard
      cy.contains('Usuário criado com sucesso!'); // Verifica se a mensagem de boas-vindas é exibida na página
    })

    it.('should nform that the email already exists in the system', () => {
        cy.visit('http://localhost:3000/login'); // Visita a página de login da aplicação
        
        cy.contains('Registre-se').click();
        cy.get('#name').type('Madalena'); // Preenche o campo de nome
        cy.get('#email-register').type('maria3@teste.com'); // Preenche o campo de email
        cy.get('#pass-register').type('1234'); // Preenche o campo de senha
        
        cy.get('#submit-register').click(); // Envia o formulário
        
        //cy.url().should('include', '/home'); // Verifica se o usuário foi redirecionado para a página de dashboard
        cy.contains('O e-mail informado já foi cadastrado em nosso sistema!'); // Verifica se a mensagem de boas-vindas é exibida na página
      })

  })
  