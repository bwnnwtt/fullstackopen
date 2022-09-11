import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('test for new blog form', () => {
  const addBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={addBlog}/>
  )

  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const author = component.container.querySelector('#author')
  const form = component.container.querySelector('form')

  fireEvent.change(title,{
    target: { value: 'testing the blogform' }
  })

  fireEvent.change(url,{
    target: { value: 'www.testing.com' }
  })

  fireEvent.change(author,{
    target: { value: 'Master ninja' }
  })

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('testing the blogform')
  expect(addBlog.mock.calls[0][0].url).toBe('www.testing.com')
  expect(addBlog.mock.calls[0][0].author).toBe('Master ninja')

})