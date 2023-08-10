import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Login', () => {
  it('Testar se é possível fazer login', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, 'tryber@teste.com');
    userEvent.type(password, '123456');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');
  });
});
