describe('blog app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'danleks',
      name: 'alex',
      password: '1234q'
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('danleks')
      cy.get('#password').type('1234q')
      cy.get('#loginButton').click()

      cy
        .get('.message')
        .should('contain', 'Successfully logged in')
        .and('have.css', 'background', 'rgb(0, 128, 0) none repeat scroll 0% 0%')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('danleks')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy
        .get('.message')
        .should('contain', 'ERROR: invalid username or password')
        .and('have.css', 'background',  'rgb(255, 0, 0) none repeat scroll 0% 0%')

    })
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.login({  username: 'danleks', password: '1234q' })
    })

    it('blog can be created', function () {
      cy.contains('new note').click()
      cy.get('#title').type('new cypress blog')
      cy.get('#author').type('danleks')
      cy.get('#url').type('www.google.com')
      cy.contains('create').click()

      cy
        .get('.blogItem')
        .should('contain', 'new cypress blog')
    })

    it('user can like a blog', function () {
      cy.addBlog({ title: 'blog 1', author: 'author 1', url: 'google.com' })
      cy.addBlog({ title: 'blog 2', author: 'author 2', url: 'google.com' })
      cy.addBlog({ title: 'blog 3', author: 'author 3', url: 'google.com' })

      cy.contains('blog 2').parent().find('button').as('theShowButton')
      cy.get('@theShowButton').click()
      cy.get('.likeButton').click()
      cy
        .get('.numberOfLikes')
        .should('contain', '1')
    })

    it('user who created the blog can delete it', function () {
      cy.addBlog({ title: 'blog 1', author: 'author 1', url: 'google.com' })
      cy.addBlog({ title: 'blog 2', author: 'author 2', url: 'google.com' })
      cy.addBlog({ title: 'blog 3', author: 'author 3', url: 'google.com' })

      cy.contains('blog 2').parent().find('button').as('theShowButton')
      cy.get('@theShowButton').click()

      cy.contains('remove').click()

      cy
        .get('html')
        .should('not.contain', 'blog 2')
    })

    it('user who not created the blog cannot delete it', function () {
      cy.addUser({ username: 'root', name: 'root', password: '1234q' })
      cy.login({ username: 'root', password: '1234q' })
      cy.addBlog({ title: 'root', author: 'root', url: 'google.com' })
      cy.login({ username: 'danleks', password: '1234q' })
      cy.addBlog({ title: 'danleks', author: 'danleks', url: 'google.com' })

      cy.contains('root').parent().find('button').as('theShowButton')
      cy.get('@theShowButton').click()
      cy.should('not.contain', 'remove')
    })

    it('blogs are ordered according to likes - blog with the most likes being first', function(){
      cy.login({ username: 'danleks', password: '1234q' })
      cy.addBlog({ title: 'blog 1', author: 'danleks', url: 'google.com', likes: 5 })
      cy.addBlog({ title: 'blog 2', author: 'danleks', url: 'google.com', likes: 7 })
      cy.addBlog({ title: 'blog 3', author: 'danleks', url: 'google.com', likes: 10 })

      cy.get('.blogItem').eq(0).should('contain', 'blog 3')
      cy.get('.blogItem').eq(1).should('contain', 'blog 2')
      cy.get('.blogItem').eq(2).should('contain', 'blog 1')
    })
  })
})