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
    it('Digita e pressionar Enter', () => {
        cy.get('@searchField')
        .type(`${searchTerm}{enter}`)

        cy.wait('@getSearchResults')

        cy.get('.result')
        .should('have.length',1)
    });

    it('Digita e clica na lupa', () => {
        cy.get('@searchField')
        .type(`${searchTerm}{enter}`)
        cy.get('input[type="submit"]')
        .should('be.visible')
        .click()

        cy.wait('@getSearchResults')

        cy.get('.result')
        .should('have.length',1)
    });

    it.only('Digita e submete o formulario diretamente', () => {
        cy.get('@searchField')
        .type(`${searchTerm}{enter}`)
        cy.get('form').submit()

        cy.wait('@getSearchResults')

        cy.get('.result')
        .should('have.length',1)
    });
});