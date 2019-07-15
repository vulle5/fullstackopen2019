describe('Login view ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Severi',
      username: 'Vulle',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

describe('Main view', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Severi',
      username: 'Vulle',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
    cy.get('input:first')
      .click()
      .type('Vulle')
    cy.get('input:last')
      .click()
      .type('salainen')
    cy.contains('login').click()
  })

  it('can create blog', function() {
    cy.contains('new note').click()
    cy.get('#title')
      .click()
      .type('Flutter')
    cy.get('#author')
      .click()
      .type('Minä')
    cy.get('#url')
      .click()
      .type('flutter.dev')
    cy.contains('create').click()
    cy.contains('cancel').click()
    cy.contains('Flutter')
  })

  it('can comment on a blog', function() {
    cy.contains('new note').click()
    cy.get('#title')
      .click()
      .type('Flutter')
    cy.get('#author')
      .click()
      .type('Minä')
    cy.get('#url')
      .click()
      .type('flutter.dev')
    cy.contains('create').click()
    cy.contains('cancel').click()
    cy.get('#blog-title').click()
    cy.get('#comment')
      .click()
      .type('Nice Comment')
    cy.get('#comment-add').click()
    cy.contains('Nice Comment')
  })
})
