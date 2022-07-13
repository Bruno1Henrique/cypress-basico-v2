Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Bruno Henrique')
    cy.get('#lastName').type('Pedroso')
    cy.get('#email').type('henrique@compufour.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    
})