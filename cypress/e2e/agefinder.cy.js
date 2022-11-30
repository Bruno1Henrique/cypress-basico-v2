describe('Age finder', () => {
    beforeEach(() => {
      const now = new Date('2022-07-20').getTime()
  
      cy.clock(now) // Freezes date to June 16, 2021
      cy.visit('https://age-finder.vercel.app/')
    })
  
    context('Plural', () => {
      const inputs = [
        {
          birthdate: '2022-07-19',
          age: '0'
        },
        {
          birthdate: '1982-04-15',
          age: '40'
        }
      ]
  
      inputs.forEach(input => {
        it.skip(`pluralizes the found age - ${input.age}`, () => {
          cy.setDate(input.birthdate)
  
          cy.contains('p', `You're ${input.age} years old`)
            .should('be.visible')
        })
      })
    })
  
    context('Singular', () => {
      it.skip('singularizes when age is 1', () => {
        cy.setDate('2021-06-19')
  
        cy.contains('p', "You're 1 year old")
          .should('be.visible')
      })
    })
  
    context('Date in the future', () => {
      it.skip('asks if you are from the future', () => {
        cy.setDate('2022-07-20')
  
        cy.contains('p', 'Are you from the future?')
          .should('be.visible')
      })
    })
  
    context('Empty date', () => {
      it.skip('does not show paragraph when clearing the date', () => {
        cy.setDate('2023-07-20')
        cy.contains('p', 'Are you from the future?')
          .should('be.visible')
  
        cy.get('[data-cy=birthdate-date-field]')
          .clear()
          .blur()
  
        cy.get('p').should('not.exist')
      })
    })
  })