import React from 'react'
import { MemoryRouter } from 'react-router'
import TestRenderer from 'react-test-renderer'

import App from '../../App'
import Home from '../home'

describe('App routes', () => {
  it('should render home page on /', () => {
    const testRenderer = TestRenderer.create(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    expect(testRenderer.root.findAllByType(Home).length).toBe(1)
  })

  it('should render 404 page on anything else', () => {
    const testRenderer = TestRenderer.create(
      <MemoryRouter initialEntries={['/anything-else-' + Math.random()]}>
        <App />
      </MemoryRouter>
    )
    expect(testRenderer.root.findAllByType(Home).length).toBe(0)
  })
})
