import React from 'react'
import { render, screen } from "@testing-library/react"
import Hability from './index'

describe('<Hability />', () => {
  it('shows the hability', () => {
    render(<Hability hability={'Adaptability'} />)

    expect(screen.getByText('Adaptability')).toBeInTheDocument()
  })
})
