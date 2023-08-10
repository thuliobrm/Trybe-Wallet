import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  closeRequestEditAction,
  createExpenseThunk,
  updateExpensesAction,
  walletApiThunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valueInput: '',
    expenseDescription: '',
    expenseCurrency: '',
    paymentMethod: 'Dinheiro',
    tag: 'Alimentação',
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(walletApiThunk());
    const { currencies } = this.props;
    this.setState({
      expenseCurrency: currencies[0],
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleEdit = () => {
    const {
      valueInput,
      expenseCurrency,
      paymentMethod,
      tag,
      expenseDescription,
    } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;
    const expensesCopy = [...expenses];
    const index = expensesCopy.findIndex((expense) => expense.id === idToEdit);
    const expense = expensesCopy[index];
    expensesCopy[index] = {
      ...expense,
      value: valueInput,
      currency: expenseCurrency,
      method: paymentMethod,
      tag,
      description: expenseDescription,
    };
    dispatch(updateExpensesAction(expensesCopy));
    dispatch(closeRequestEditAction());
    this.clearInputs();
  };

  handleExpenseBtn = () => {
    const {
      valueInput,
      expenseCurrency,
      paymentMethod,
      tag,
      expenseDescription,
    } = this.state;
    const { dispatch, expenses } = this.props;
    const expenseData = {
      id: expenses.length,
      value: valueInput,
      currency: expenseCurrency,
      method: paymentMethod,
      tag,
      description: expenseDescription,
    };
    dispatch(createExpenseThunk(expenseData));
    this.clearInputs();
  };

  clearInputs = () => {
    this.setState({
      valueInput: '',
      expenseDescription: '',
      expenseCurrency: 'USD',
      paymentMethod: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const {
      valueInput,
      expenseDescription,
      expenseCurrency,
      paymentMethod,
      tag,
    } = this.state;
    const { currencies, editor } = this.props;
    return (
      <section className="form-container">
        <form>

          <div>
            <label htmlFor="description">
              Descrição da despesa:
            </label>
            <input
              id="description"
              className="description-input"
              data-testid="description-input"
              value={ expenseDescription }
              name="expenseDescription"
              onChange={ this.handleChange }
            />
          </div>

          <div>
            <label htmlFor="value">
              Valor da despesa:
            </label>
            <input
              id="value"
              className="value-input"
              data-testid="value-input"
              value={ valueInput }
              name="valueInput"
              onChange={ this.handleChange }
            />
          </div>

          <div>
            <label htmlFor="currency">
              Moeda:
            </label>
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              name="expenseCurrency"
              value={ expenseCurrency }
            >
              { currencies.map((currency) => (
                <option key={ currency } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="payment">
              Método de pagamento:
            </label>
            <select
              id="payment"
              data-testid="method-input"
              onChange={ this.handleChange }
              name="paymentMethod"
              defaultChecked={ paymentMethod }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </div>

          <div>
            <label htmlFor="category">
              Categoria:
            </label>
            <select
              id="category"
              data-testid="tag-input"
              onChange={ this.handleChange }
              name="tag"
              defaultChecked={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </div>

        </form>
        <section className="btn-content">
          {
            editor === true ? (
              <button
                className="add-expense"
                type="button"
                onClick={ this.handleEdit }
              >
                Editar despesa
              </button>
            ) : (
              <button
                className="add-expense"
                type="button"
                onClick={ this.handleExpenseBtn }
              >
                Adicionar despesa

              </button>)
          }
        </section>

      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
  editor: globalState.wallet.editor,
  idToEdit: globalState.wallet.idToEdit,
});

WalletForm.propTypes = {
  idToEdit: propTypes.number.isRequired,
  editor: propTypes.bool.isRequired,
  dispatch: propTypes.func.isRequired,
  currencies: propTypes.arrayOf(propTypes.string).isRequired,
  expenses: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    value: propTypes.string,
    currency: propTypes.string,
    method: propTypes.string,
    tag: propTypes.string,
    description: propTypes.string,
    // exchangeRates: propTypes.shape({})
  })).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
