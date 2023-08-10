import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('', () => {
  test('Testa se o header está na pagina', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'McDonalds');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    userEvent.click(button);

    expect(inputValue).toBeInTheDocument();
  });
});
