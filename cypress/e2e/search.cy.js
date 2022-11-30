//Se refere a aula https://www.youtube.com/watch?v=bqz7sv-LgrM&t=1459s

let searchTerm = 'cypress.io'

describe('Procurar', () => {

    beforeEach(() => {
        cy.intercept(
        'GET',
        `**?q=${searchTerm}**`
        ).as('getSearchResults')

        cy.visit('https://duckduckgo.com')

        cy.get('input[type="text"]')
        .as('searchField')
        .should('be.visible')
    })
    it.skip('Digita e pressionar Enter', () => {
        cy.get('@searchField')
        .type(`${searchTerm}{enter}`)

        cy.wait('@getSearchResults')

        cy.get('.result')
        .should('have.length',1)
    });

    it.skip('Digita e clica na lupa', () => {
        cy.get('@searchField')
        .type(`${searchTerm}{enter}`)
      
      
        cy.get('input[type="submit"]')
        .should('be.visible')
        .click()

        cy.wait('@getSearchResults')

        cy.get('.result')
        .should('have.length',1)
    });

    it.skip('Digita e submete o formulario diretamente', () => {
        cy.get('@searchField')
        .type(`${searchTerm}{enter}`)
        cy.get('form').submit()

        cy.wait('@getSearchResults')

        cy.get('.result')
        .should('have.length',1)
    });
});