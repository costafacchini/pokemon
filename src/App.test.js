import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('shows the nav bar and pokemons', () => {
    render(<App />);

    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', 'https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png')
    expect(screen.getByRole('textbox', { value: 'expression' })).toBeInTheDocument()
  })
})
