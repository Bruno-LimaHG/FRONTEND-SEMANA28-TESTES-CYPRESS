describe('Teste de Cadastro de Usuário — Fluxo E2E Completo', () => {
  beforeEach(() => {
    // Carrega a página local de cadastro
    cy.visit('http://localhost:3000/cadastro.html');
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    // Preenche os campos do formulário
    cy.get('input[name="nome"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@example.com');
    cy.get('input[name="senha"]').type('senha123');

    // Clica no botão de cadastro
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de sucesso aparece
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
  });

  // TAREFAS DE EXPANSÃO (Cenários Negativos e Validações)
  it('Não deve cadastrar usuário com e-mail inválido', () => {
    cy.get('input[name="nome"]').type('Carlos Souza');
    cy.get('input[name="email"]').type('email-sem-arroba');
    cy.get('input[name="senha"]').type('senha123');
    cy.get('button[type="submit"]').click();

    cy.contains('Por favor, informe um e-mail válido.').should('be.visible');
    cy.contains('Cadastro realizado com sucesso!').should('not.exist');
  });

  it('Não deve submeter formulário com campos em branco', () => {
    cy.get('button[type="submit"]').click();
    cy.contains('Preencha todos os campos obrigatórios.').should('be.visible');
  });

  it('Não deve permitir senha menor que 6 caracteres', () => {
    cy.get('input[name="nome"]').type('Mariana Lima');
    cy.get('input[name="email"]').type('mariana@teste.com');
    cy.get('input[name="senha"]').type('123');
    cy.get('button[type="submit"]').click();

    cy.contains('A senha deve conter no mínimo 6 caracteres.').should('be.visible');
  });
});
