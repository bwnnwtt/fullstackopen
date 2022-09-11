import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import blogService from '../services/blogs'
import Blog from './Blog'

describe('<Blog >', () => {
  let component
  const sampleBlog = {
    likes: 69,
    title: 'Test Blog',
    author: 'Test Blogger',
    url:
			'http://www.blogger.com/test',
    user: {
      id: '5f282041d7c32d195801e464',
      username: 'tester',
      name: 'tester'
    }
  }

  const userObj = {
    username: 'tester',
    name: 'tester'
  }

  const mockHandler = jest.fn()

  blogService.update = jest.fn().mockImplementation(() => {
    return Promise.resolve({ 'success': true })
  })

  beforeEach(() => {
    component = render(<Blog blog={sampleBlog} user={userObj} handleLikes={mockHandler}/>)
  })

  test('the component is displaying blog title and author by default', () => {
    const div = component.container.querySelector('.blogDefault')

    expect(div).toHaveTextContent(sampleBlog.title)
    expect(div).toHaveTextContent(sampleBlog.author)
    expect(div).not.toHaveTextContent(sampleBlog.likes)
    expect(div).not.toHaveTextContent(sampleBlog.url)

  })

  test('the component is displaying url and likes after clicking button', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(sampleBlog.likes)
    expect(component.container).toHaveTextContent(sampleBlog.url)
  })

  test('if the like button is clicked twice, the event handler should be called twice',() => {

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})