/// <reference types="Cypress" />





describe('Central de Atendimento ao Cliente TAT', function() {

    let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {


        cy.get('#firstName').type('Bruno Henrique')
        cy.get('#lastName').type('Pedroso')
        cy.get('#email').type('henrique@compufour.com.br')
        cy.get('#open-text-area').type(text, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Bruno Henrique')
        cy.get('#lastName').type('Pedroso')
        cy.get('#email').type('henrique@compufour,com.br') //Aqui o email está com virgula
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
        .type('abcdefghij')
        .should('have.value','')
    });

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {

        cy.get('#firstName').type('Bruno Henrique')
        cy.get('#lastName').type('Pedroso')
        cy.get('#email').type('henrique@compufour.com.br')
        cy.get('#open-text-area').type(text, {delay: 0})
        cy.get('#phone-checkbox').check()

        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        //Preenche os campos e verifica se o valor ficou correto
        cy.get('#firstName').type('Bruno Henrique').should('have.value','Bruno Henrique')
        cy.get('#lastName').type('Pedroso').should('have.value','Pedroso')
        cy.get('#email').type('henrique@compufour.com.br').should('have.value','henrique@compufour.com.br')
        cy.get('#phone').type('49 985043080').should('have.value','49985043080')
        cy.get('#open-text-area').type(text, {delay: 0}).should('have.value',text)

        //Limpa os campos e verifica se ficou tudo limpo
        cy.get('#firstName').clear().should('have.value','')
        cy.get('#lastName').clear().should('have.value','')
        cy.get('#email').clear().should('have.value','')
        cy.get('#phone').clear().should('have.value','')
        cy.get('#open-text-area').clear().should('have.value','')
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        //Usando o arquivo de comando para não fica escrevendo tudo de novo
       cy.fillMandatoryFieldsAndSubmit()

       cy.get('.success').should('be.visible')
    });

    //Campos de seleção suspensa

    //Selecionando campo pelo texto
    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value','youtube')
    });

    //Selecionando produto pelo value
    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value','blog')
    });

    //Selecionando campos do tipo radio
    it('marca o tipo de atendimento "Ajuda"', () => {
        cy.get('input[type="radio"][value="ajuda"]').check().should('have.value','ajuda')  
       
    });

    it('marca o tipo de atendimento "Elogio', () => {
        cy.get('input[type="radio"]').check('elogio').should('have.value','elogio')
    });

    it('marca o tipo de atendimento "Feedback', () => {
        cy.get('input[type="radio"]').check('feedback').should('have.value','feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //Marcando checkboxes
    it('marca ambos checkboxes, depois desmarca o último', () => {
        //cy.get('#email-checkbox').check().should('be.checked') //Da pra fazer assim também
        //cy.get('#phone-checkbox').check().should('be.checked')
       cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    });

})
  