import React from 'react'
import { render, screen } from '@testing-library/react'
import MultipleInformation from './index'

describe('<MultipleInformation />', () => {
  function mount(title, collection) {
    render(<MultipleInformation title={title} collection={collection} />)
  }

  it('shows the title in uppercase and values of information', () => {
    mount('Número', [ 'Azul', 'Verde', 'Amarelo' ])

    expect(screen.getByText('NÚMERO')).toBeInTheDocument()
    expect(screen.getByText('Azul')).toBeInTheDocument()
    expect(screen.getByText('Verde')).toBeInTheDocument()
    expect(screen.getByText('Amarelo')).toBeInTheDocument()
  })
})
