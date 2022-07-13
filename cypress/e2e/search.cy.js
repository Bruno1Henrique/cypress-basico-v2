

describe('Procurar', () => {

    beforeEach(() => {
        cy.intercept(
        'GET',
        '**?q=cypress.io**'
        ).as('getSearchResults')

        cy.visit('https://duckduckgo.com')
    })
    it.only('Digita e pressionar Enter', () => {
        cy.get('input[type="text"]')
        .should('be.visible')
        .type('cypress.io{enter}')

        cy.wait('@getSearchResults')
    });

    it('Digita e clica na lupa', () => {
        
    });

    it('Digita e submete o formulario diretamente', () => {
        
    });
});