describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Login to application')
  })

  it('can log in', function() {
    cy.get('input:first')
      .click()
      .type('Vulle')
    cy.get('input:last')
      .click()
      .type('salainen')
    cy.contains('login').click()
    cy.contains('Severi')
  })
})

describe('Log out', function() {
  it('can log out', function() {
    cy.contains('logout').click()
    cy.contains('Login to application')
  })
})
