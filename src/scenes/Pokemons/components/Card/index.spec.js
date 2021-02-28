import React from 'react'
import { render, screen } from "@testing-library/react"
import Card from './index'

describe('<Card />', () => {
  function mount(name, number, abilities, imgURL) {
    render(<Card name={name} number={number} abilities={abilities} imgURL={imgURL} />)
  }

  it('shows the pokeomn card', () => {
    mount('Charmander', '001', ['Adaptability', 'Aerilate'], 'http://img.com')

    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('001')).toBeInTheDocument()
    expect(screen.getByText('Adaptability')).toBeInTheDocument()
    expect(screen.getByText('Aerilate')).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://img.com')
  })
})
