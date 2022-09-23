describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tester',
      username: 'tester',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('tester logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tester')
      cy.get('#password').type('abcdefg')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tester', password: 'password'})
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testblog')
      cy.get('#author').type('tester')
      cy.get('#url').type('http://www.testurl.com/post/1')

      cy.get('#create-button').click()
      cy.contains('A new blog testblog by tester added')

    })

    describe('a blog exists', function() {
      beforeEach(function() {
        const blog = {
          title: 'firstblog',
          author: 'tester',
          url: 'http://www.test.com/post/0',
          likes: 69
        }
        cy.create(blog)
      })

      it('user can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('added like to firstblog!')
      })

      it('user can delete a blog', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('deleted firstblog!')
      })

      it('blog with most likes is shown first', function() {
        const blog = {
          title: 'secondblog',
          author: 'tester',
          url: 'http://www.test.com/post/0',
          likes: 0
        }
        cy.create(blog)
        cy.get('.blog').eq(0).should('contain', 'firstblog')
        cy.get('.blog').eq(1).should('contain', 'secondblog')
      })
    })

  })

})