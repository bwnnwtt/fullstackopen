import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  // let container

  // beforeEach(() => {
  //   const blog = {
  //     title: 'testblog',
  //     author: 'tester',
  //     url: 'www.test.com',
  //     likes: 69,
  //     user: {
  //       name: 'tester',
  //       username: 'tester'
  //     }
  //   }

  //   const user = {
  //     username: 'tester'
  //   }
  // })

  test('renders blog default', () => {
    const blog = {
      title: 'testblog',
      author: 'tester',
      url: 'www.test.com',
      likes: 69,
      user: {
        name: 'tester',
        username: 'tester'
      }
    }

    const user = {
      username: 'tester'
    }

    const { container } = render(<Blog blog={blog} user={user} />)

    const div = container.querySelector('.blogDefault')

    expect(div).toHaveTextContent('testblog tester view')

  })
})