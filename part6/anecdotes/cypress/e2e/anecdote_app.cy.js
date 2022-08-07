import { anecdotesAtStart } from '../../src/reducers/anecdoteReducer'

describe('Anecdote App', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000/')
    cy.contains('Anecdotes')
    anecdotesAtStart.forEach(anecdote => {
      cy.contains(anecdote)
    })
  })

  it('user can type into add new anecdote form', function () {
    cy.get('#content').type('testing with cypress')
    cy.get('#add').click()

    cy.contains('testing with cypress')
  })

  it('user can increase number if votes', function () {
    cy
      .contains('If it hurts, do it more often')
      .parent().parent()
      .find('button')
      .as('theVoteButton')

    cy.get('@theVoteButton').click()

    cy
      .contains('If it hurts, do it more often')
      .parent().parent()
      .should('contain', 'has 1')
  })

  it('anecdotes are ordered according to votes', function () {
    cy
      .contains('Premature optimization is the root of all evil.')
      .parent().parent()
      .find('button')
      .as('theButton')

    cy.get('@theButton').click()
    cy.get('@theButton').click()


    cy.get('.listItem').eq(0).should('contain', 'Premature optimization is the root of all evil.')
    cy.get('.listItem').eq(1).should('contain', 'If it hurts, do it more often')
  })
})