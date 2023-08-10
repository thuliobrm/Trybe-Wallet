import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { requestEditExpensesAction, updateExpensesAction } from '../redux/actions';
import excluir from '../images/excluir.png';
import edit from '../images/edit.png';

class Table extends Component {
  handleDeleteExpense = (id) => {
    console.log('executou');
    const { expenses, dispatch } = this.props;
    const expensesCopy = [...expenses];
    const index = expensesCopy.findIndex((expense) => expense.id === id);
    expensesCopy.splice(index, 1);
    dispatch(updateExpensesAction(expensesCopy));
  };

  handleRequestEditExpenses = (id) => {
    const { dispatch } = this.props;
    dispatch(requestEditExpensesAction(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <section className="table-container">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
                <td>
                  {Number(
                    expense.value * expense.exchangeRates[expense.currency].ask,
                  ).toFixed(2) }

                </td>
                <td>Real</td>
                <td>
                  <button
                    className="delete-btn"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteExpense(expense.id) }
                  >
                    <img src={ excluir } alt="delete" />
                  </button>

                  <button
                    className="edit-btn"
                    data-testid="edit-btn"
                    onClick={ () => this.handleRequestEditExpenses(expense.id) }
                  >
                    <img src={ edit } alt="edit" />
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

Table.propTypes = {
  dispatch: propTypes.func.isRequired,
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

export default connect(mapStateToProps)(Table);
