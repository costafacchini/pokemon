import React from 'react'
import { render, screen } from '@testing-library/react'
import Stats from './index'

describe('<Stats />', () => {
  function mount(stats) {
    render(<Stats stats={stats} />)
  }

  it('shows the title and stats graphic', () => {
    const stats = [ { name: 'hp', value: 20 }, { name: 'defense', value: 36 } ]
    mount(stats)

    // The graph library is highly dependent on the DOM and therefore there is no way to test the graph
    // Let's test the component waiting for the graph
    expect(screen.getByText('ESTATÍSTICAS')).toBeInTheDocument()
    expect(screen.getByText('Loading Chart')).toBeInTheDocument()
  })
})
