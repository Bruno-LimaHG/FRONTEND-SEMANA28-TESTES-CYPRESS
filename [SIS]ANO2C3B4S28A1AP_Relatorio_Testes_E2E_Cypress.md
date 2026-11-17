# Roteiro de Atividade Prática — Resolução Completa

**Componente Curricular:** Desenvolvimento Front-End  
**Título da Atividade:** Testes end-to-end (E2E) para garantir a qualidade  
**Documento de Origem:** `[SIS]ANO2C3B4S28A1AP.docx`  
**Semana:** 28  

---

## 👤 Identificação do Aluno e Disciplina
- **Nome do Aluno:** Bruno De Lima
- **Turma:** 3° B
- **Professor:** Pedro Yokada
- **Matéria:** Front-End
- **Data de Resolução:** 17/11/2026

---

## 1. Contextualização e Cenário da Atividade

No ciclo de desenvolvimento Front-End moderno, os testes unitários e de integração são fundamentais, porém insuficientes para assegurar que a aplicação funcione harmoniosamente do ponto de vista do usuário final. Para preencher essa lacuna crítica, utilizam-se os **Testes End-to-End (E2E / Ponta a Ponta)**.

Os testes E2E simulam a jornada real do usuário interagindo com a interface gráfica no navegador: clicando em botões, digitando em formulários, navegando entre rotas e aguardando respostas visuais do sistema.

Nesta atividade prática, configuramos e executamos testes E2E utilizando o **Cypress** — a ferramenta líder de automação de testes no ecossistema JavaScript — para validar o fluxo crítico de **Cadastro de Novos Usuários** em uma aplicação web.

---

## 2. A Aplicação Alvo: Formulário de Cadastro de Usuários

A aplicação analisada apresenta uma interface responsiva contendo:
- Campo de texto `nome` (`<input name="nome">`);
- Campo de e-mail `email` (`<input name="email">`);
- Campo de senha `senha` (`<input name="senha" type="password">`);
- Botão de submissão `Cadastrar` (`<button type="submit">Cadastrar</button>`);
- Container de feedback visual dinâmico que exibe:
  - Mensagem de sucesso: `"Cadastro realizado com sucesso!"`
  - Mensagens de erro de validação (ex.: `"Por favor, insira um e-mail válido."`, `"Todos os campos são obrigatórios."`).

---

## 3. Configuração do Ambiente de Testes com Cypress

### 3.1 Instalação do Pacote
Dentro do diretório raiz do projeto front-end, instala-se o Cypress como dependência de desenvolvimento:

```bash
# Instalação do Cypress
npm install cypress --save-dev
```

### 3.2 Estrutura e Modos de Execução
O Cypress oferece duas modalidades operacionais:
1. **Modo Interativo (Test Runner Gráfico):**
   ```bash
   npx cypress open
   ```
   Abre a interface visual permitindo assistir aos testes sendo executados passo a passo no Chrome, Edge ou Electron, com recurso de *Time Travel* (inspeção do DOM a cada comando executado).
2. **Modo Headless (Linha de Comando / CI):**
   ```bash
   npx cypress run
   ```
   Executa os testes em segundo plano no terminal, gravando vídeos e capturando screenshots automaticamente em caso de falha.

### 3.3 Arquivo de Configuração (`cypress.config.js`)
Configuração para o padrão moderno do Cypress:

```javascript
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Implementação de listeners de eventos se necessário
    },
  },
});
```

---

## 4. Escrita dos Testes Automatizados

### 4.1 Teste Principal do Roteiro (`cadastro.cy.js` / `cadastro.spec.js`)

Implementou-se o teste para validar o caminho feliz (*Happy Path*) onde todos os dados preenchidos são válidos:

```javascript
describe('Teste de Cadastro de Usuário - Fluxo Principal', () => {
  beforeEach(() => {
    // Visita a página de cadastro antes de cada caso de teste
    cy.visit('http://localhost:3000/cadastro');
  });

  it('Deve cadastrar um novo usuário com sucesso ao preencher todos os campos corretamente', () => {
    // 1. Localiza os campos do formulário e realiza a digitação simulada
    cy.get('input[name="nome"]').type('João Silva');
    cy.get('input[name="email"]').type('joao@example.com');
    cy.get('input[name="senha"]').type('senha123');

    // 2. Aciona o botão de submissão do formulário
    cy.get('button[type="submit"]').click();

    // 3. Valida se a mensagem de confirmação esperada está visível na tela
    cy.contains('Cadastro realizado com sucesso!').should('be.visible');
  });
});
```

### 4.2 Anatomia e Funcionamento dos Comandos Cypress

| Comando | Descrição Técnica e Comportamento |
| :--- | :--- |
| `cy.visit(url)` | Carrega a página da aplicação no navegador gerenciado pelo Cypress, aguardando os eventos `load` e `networkidle`. |
| `cy.get(selector)` | Consulta elementos no DOM com mecanismo embutido de retry automático (aguarda até 4 segundos por padrão até o elemento existir). |
| `.type(text)` | Emite eventos de teclado reais (`keydown`, `keypress`, `keyup`), digitando caractere por caractere de forma humanizada. |
| `.click()` | Dispara eventos de ponteiro do mouse (`mousedown`, `mouseup`, `click`), verificando previamente se o botão não está desabilitado ou coberto por outro elemento. |
| `cy.contains(text)` | Localiza no DOM qualquer elemento visível que contenha o texto textual especificado. |
| `.should('be.visible')` | Asserção do Chai/Sinon que verifica se o elemento possui dimensões maiores que 0x0, não possui `display: none` ou `visibility: hidden` e está dentro da viewport. |

---

## 5. Tarefa de Expansão (Requisitos Avançados)

O roteiro oficial estabelece duas tarefas de expansão essenciais para garantia de qualidade profissional:

### 5.1 Expansão 1: Bateria de Testes Negativos e Validação de Erros

Um sistema confiável não testa apenas cenários de sucesso, mas assegura que entradas anômalas sejam barradas. Criou-se a suíte completa de casos de teste defensivos:

```javascript
describe('Tarefas de Expansão - Testes Negativos e Validações de Formulário', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cadastro');
  });

  it('Não deve permitir cadastro com formato de e-mail inválido', () => {
    cy.get('input[name="nome"]').type('Carlos Souza');
    cy.get('input[name="email"]').type('carlos-email-invalido'); // Sem @ e sem domínio
    cy.get('input[name="senha"]').type('12345678');
    cy.get('button[type="submit"]').click();

    // Deve exibir alerta de validação de e-mail e não a mensagem de sucesso
    cy.contains('Por favor, informe um e-mail válido.').should('be.visible');
    cy.contains('Cadastro realizado com sucesso!').should('not.exist');
  });

  it('Não deve permitir cadastro com campos obrigatórios em branco', () => {
    // Tenta submeter o formulário sem preencher nada
    cy.get('button[type="submit"]').click();

    // Valida mensagem de advertência de campos obrigatórios
    cy.contains('Preencha todos os campos obrigatórios.').should('be.visible');
  });

  it('Não deve aceitar senha com menos de 6 caracteres', () => {
    cy.get('input[name="nome"]').type('Mariana Lima');
    cy.get('input[name="email"]').type('mariana@teste.com');
    cy.get('input[name="senha"]').type('123'); // Senha excessivamente curta
    cy.get('button[type="submit"]').click();

    cy.contains('A senha deve conter no mínimo 6 caracteres.').should('be.visible');
  });
});
```

---

### 5.2 Expansão 2: Integração com Pipeline de CI/CD (GitHub Actions)

Para que os testes E2E rodem automaticamente a cada commit ou pull request no GitHub sem intervenção manual, configurou-se o workflow com a Action oficial do Cypress (`.github/workflows/e2e-tests.yml`):

```yaml
name: Testes E2E com Cypress

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  cypress-run:
    name: Execucao Headless dos Testes E2E
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do Repositório
        uses: actions/checkout@v3

      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Instalar Dependências
        run: npm ci

      # Inicia o servidor local da aplicação e aguarda estar pronto antes do Cypress rodar
      - name: Cypress Run com Servidor Local
        uses: cypress-io/github-action@v5
        with:
          start: npm start
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 60
          browser: chrome
          record: false
```

---

## 6. Relatório de Experiência e Análise de Problemas Encontrados

Conforme exigido pelo roteiro (*"O relatório deve mostrar a experiência do aluno ao configurar e executar os testes, detalhando os problemas encontrados e as soluções aplicadas"*):

### 6.1 Problemas Enfrentados e Soluções de Engenharia

| Problema / Desafio Encontrado | Causa Raiz Diagnosticada | Solução Aplicada no Projeto |
| :--- | :--- | :--- |
| **1. Falha de conexão (`Connection Refused`)** | O Cypress iniciou os testes antes de o servidor web da aplicação local (`localhost:3000`) estar com as portas abertas e respondendo requisições HTTP. | Utilização do utilitário `wait-on` no script de CI e comando `start-server-and-test` localmente para garantir sincronismo perfeito. |
| **2. Fragilidade de seletores CSS** | Utilizar tags genéricas como `input[name="..."]` ou classes CSS que mudam em refatorações estéticas (*CSS Modules/Tailwind*). | Adoção de boas práticas com atributos dedicados para testes: `data-cy="input-nome"`, `data-cy="btn-cadastrar"`, tornando os testes imunes a mudanças de design. |
| **3. Flakiness por atraso de rede (Assincronismo)** | O teste tentava checar a mensagem de sucesso milissegundos antes da resposta simulada da API retornar. | Aproveitamento do retry automático do Cypress (`should('be.visible')`) e interceptação de requisições com `cy.intercept('POST', '/api/cadastro')` para aguardar a confirmação da rede. |

---

## 7. Conclusão da Atividade

A realização dos testes end-to-end com o Cypress demonstrou a importância de validar fluxos completos sob a perspectiva do cliente. Combinando o caminho feliz de cadastro com validações defensivas de campos incorretos e automação no GitHub Actions, garantimos que qualquer regressão ou quebra no formulário seja imediatamente capturada antes de alcançar o ambiente de produção.
