import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import emoji from '../images/emoji.svg';
import currency from '../images/currency.png';
import profile from '../images/profile.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => {
      const BRL_EXPENSE = curr.value * curr.exchangeRates[curr.currency].ask;
      return (acc + BRL_EXPENSE);
    }, 0);
    return (
      <div className="header-container">
        <h2>
          <img src={ emoji } alt="emoji" />
          Trybe
          <span>Wallet</span>
        </h2>
        <p className="total-field" data-testid="total-field">
          <img src={ currency } alt="moeda" />
          Total de despesas R$:
          {totalExpenses.toFixed(2)}
        </p>
        {/* <p data-testid="header-currency-field">BRL</p> */}
        <p className="email-field" data-testid="email-field">
          <img src={ profile } alt="profile" />
          {email}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    value: propTypes.string,
    currency: propTypes.string,
    method: propTypes.string,
    tag: propTypes.string,
    description: propTypes.string,
    exchangeRates: propTypes.shape({
      ask: propTypes.string,
    }),
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
