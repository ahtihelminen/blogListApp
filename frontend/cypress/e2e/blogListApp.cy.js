describe('Bloglistapp', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    
    const user = {
      name: 'Ahti Helminen',
      username: 'ahelminen',
      password: 'salainen'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username_field')
    cy.get('#password_field')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username_field').type('ahelminen')
      cy.get('#password_field').type('salainen')
      cy.get('#login_button').click()
      
      cy.contains(`User Ahti Helminen logged in`)
      cy.get('#logout_button')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username_field').type('ahelminen')
      cy.get('#password_field').type('väärä')
      cy.get('#login_button').click()

      cy.get('.unauthorized')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    it('A blog can be created', function() {
      cy.login({
        username: 'ahelminen',
        password: 'salainen'
      })

      const testBlog = {
        title: 'Cypress test',
        author: 'test author',
        url: 'testurl.com'
      }

      cy.get('#togglable').click()
      cy.get('#title_textbox').type(testBlog.title)
      cy.get('#author_textbox').type(testBlog.author)
      cy.get('#url_textbox').type(testBlog.url)
      cy.get('#create_button').click()

      cy.get('.created')
        .should('contain', `${testBlog.title} by ${testBlog.author} created`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('#blog_element').should('contain', `${testBlog.title} ${testBlog.author}`)
    })

    it('A blog can be liked', function() {
      cy.login({
        username: 'ahelminen',
        password: 'salainen'
      })
      
      const testBlog = {
        title: 'Cypress test',
        author: 'test author',
        url: 'testurl.com'
      }

      cy.createBlog( testBlog )

      cy.get('#togglable_blog').click()
      cy.contains('0')
      cy.get('#like_button').click()
      cy.contains('1')
      cy.get('.liked')
        .should('contain', `Blog ${testBlog.title} by ${testBlog.author} liked!`)
        .and('have.css', 'color', 'rgb(32, 178, 170)')
    })

    it('A blog can be removed', function() {
      cy.login({
        username: 'ahelminen',
        password: 'salainen'
      })
      
      const testBlog = {
        title: 'Cypress test',
        author: 'test author',
        url: 'testurl.com'
      }

      cy.createBlog( testBlog )

      cy.get('#togglable_blog').click()
      cy.get('#remove_button').click()
      cy.get('.created')
        .should('contain', `Blog ${testBlog.title} by ${testBlog.author} removed succesfully`)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.should('not.contain', `${testBlog.title} ${testBlog.author}`)
    })

    it('Only a creator can remove his blog', function() {
      cy.login({
        username: 'ahelminen',
        password: 'salainen'
      })
      
      const testBlog = {
        title: 'Cypress test',
        author: 'test author',
        url: 'testurl.com'
      }

      cy.createBlog( testBlog )

      const user2 = {
        name: 'Remove button tester',
        username: 'rbtester',
        password: 'test'
      }

      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

      cy.get('#logout_button').click
      cy.login({
        username: 'rbtester',
        password: 'test'
      })
      cy.get('#togglable_blog').click()
      cy.get('.blog')
        .should('not.contain', 'remove')
    })

    it('Blogs are sorted by likes', function() {
      cy.login({
        username: 'ahelminen',
        password: 'salainen'
      })
      
      const testBlog = {
        title: 'Cypress test',
        author: 'test author',
        url: 'testurl.com',
      }

      cy.createBlog( testBlog )

      const blogMostLikes = {
        title: 'Most likes',
        author: 'test author',
        url: 'testlikes.com',
        likes: 9
      }

      cy.createBlog( blogMostLikes )
      
      cy.get('.blog').eq(0).should('contain', 'Most likes test author')
      cy.get('.blog').eq(1).should('contain', 'Cypress test test author')

    })
  })
})