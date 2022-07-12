/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {

        let text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

        cy.get('#firstName').type('Bruno Henrique')
        cy.get('#lastName').type('Pedroso')
        cy.get('#email').type('henrique@compufour.com.br')
        cy.get('#open-text-area').type(text, {delay: 0})
        cy.get('.button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Bruno Henrique')
        cy.get('#lastName').type('Pedroso')
        cy.get('#email').type('henrique@compufour,com.br')
        cy.get('#open-text-area').type('Teste')
        cy.get('.button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        
    });
})
  