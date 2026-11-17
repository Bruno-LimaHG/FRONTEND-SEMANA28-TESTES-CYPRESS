describe('Teste de Cadastro de Usuário', () => {
  it('Deve cadastrar um novo usuário com sucesso', () => {
    // Visita a página de cadastro
    cy.visit('http://localhost:3000/cadastro');
    
    // Preenche os campos do formulário
    cy.get('input[name="nome"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@example.com');
    cy.get('input[name="senha"]').type('senha123');
    
    // Clica no botão de cadastro
    cy.get('button[type="submit"]').click();
    
    // Verifica se a mensagem de sucesso aparece
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
  });
});
