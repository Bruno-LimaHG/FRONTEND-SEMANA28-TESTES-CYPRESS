# SEMANA 28 — Desenvolvimento Front-End

**Docente:** Prof. Pedro Yokada  
**Estudante:** Bruno De Lima  
**Turma:** 3° B  
**Componente:** Front-End  

---

## 📋 Atividade da Semana
- **Documento Oficial:** `[SIS]ANO2C3B4S28A1AP.docx`
- **Tema:** *Testes end-to-end (E2E) para garantir a qualidade*
- **Arquivo de Resolução:** [`[SIS]ANO2C3B4S28A1AP_Relatorio_Testes_E2E_Cypress.md`](file:///C:/Users/BrunoDeLima/Desktop/IA/FRONT/SEMANA%2028/%5BSIS%5DANO2C3B4S28A1AP_Relatorio_Testes_E2E_Cypress.md)
- **Página de Teste:** [`cadastro.html`](file:///C:/Users/BrunoDeLima/Desktop/IA/FRONT/SEMANA%2028/cadastro.html)
- **Especificações de Testes:**
  - Padrão Cypress 10+: [`cypress/e2e/cadastro.cy.js`](file:///C:/Users/BrunoDeLima/Desktop/IA/FRONT/SEMANA%2028/cypress/e2e/cadastro.cy.js)
  - Padrão Roteiro: [`cypress/integration/cadastro.spec.js`](file:///C:/Users/BrunoDeLima/Desktop/IA/FRONT/SEMANA%2028/cypress/integration/cadastro.spec.js)
- **Pipeline Automatizado:** [`.github/workflows/e2e-tests.yml`](file:///C:/Users/BrunoDeLima/Desktop/IA/FRONT/SEMANA%2028/.github/workflows/e2e-tests.yml)

---

## 📌 Conteúdos Principais Desenvolvidos
1. **Configuração do Cypress:** Ambiente configurado com suporte tanto ao modo gráfico interativo (`cypress open`) quanto headless para CI/CD (`cypress run`).
2. **Fluxo Principal de Cadastro:** Validação automatizada de preenchimento de campos (`nome`, `email`, `senha`), clique e asserção da mensagem *"Cadastro realizado com sucesso!"*.
3. **Tarefas de Expansão:** Bateria de testes defensivos para e-mail malformado, campos em branco e validação de tamanho de senha.
4. **Relatório de Engenharia para o AVA:** Análise de problemas comuns (sincronismo assíncrono, seletores CSS frágeis, conflito de portas) e as soluções adotadas.
