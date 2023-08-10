import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLoginAction } from '../redux/actions';
import '../styles/Login.css';
import emoji from '../images/emoji.svg';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { history, dispatch } = this.props;
    dispatch(userLoginAction(email));
    history.push('/carteira');
  };

  render() {
    const { password, email } = this.state;
    const MIN_CHARACTERS = 6;
    const isPasswordValid = password.length >= MIN_CHARACTERS;
    const isValidEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(email);
    const buttonDisabled = !(isPasswordValid && isValidEmail);
    return (
      <div className="login-container">
        <section className="login-content">
          <h2>
            <img src={ emoji } alt="emoji" />
            Trybe
            <span>Wallet</span>
          </h2>
          <label>
            <input
              type="email"
              data-testid="email-input"
              placeholder="Email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label>
            <input
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              minLength="6"
            />
          </label>

          <button
            className="btn-container"
            onClick={ this.handleSubmit }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </section>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default connect()(Login);
