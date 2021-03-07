import React from 'react'
import { render, screen } from '@testing-library/react'
import Information from './index'

describe('<Information />', () => {
  function mount(title, value) {
    render(<Information title={title} value={value} />)
  }

  it('shows the title in uppercase and value information', () => {
    mount('Número', 1020)

    expect(screen.getByText('NÚMERO')).toBeInTheDocument()
    expect(screen.getByText('1020')).toBeInTheDocument()
  })
})
