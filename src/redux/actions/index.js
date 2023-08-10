export const USER_LOGIN = 'USER_LOGIN';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';
export const REQUEST_EDIT_EXPENSES = 'REQUEST_EDIT_EXPENSES';
export const CLOSE_REQUEST_EDIT = 'CLOSE_REQUEST_EDIT';

export const userLoginAction = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

export const updateCurrecyAction = (currencies) => ({
  type: UPDATE_CURRENCY,
  payload: {
    currencies,
  },
});

export const walletApiThunk = () => async (dispatch) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  delete data.USDT;
  const currencies = Object.keys(data);
  dispatch(updateCurrecyAction(currencies));
};

export const updateExpensesAction = (expenses) => ({
  type: UPDATE_EXPENSES,
  payload: {
    expenses,
  },
});

export const requestEditExpensesAction = (id) => ({
  type: REQUEST_EDIT_EXPENSES,
  payload: {
    idToEdit: id,
    editor: true,
  },
});

export const closeRequestEditAction = () => ({
  type: CLOSE_REQUEST_EDIT,
  payload: {
    idToEdit: 0,
    editor: false,
  },
});

export const createExpenseThunk = (expenseData) => async (dispatch, getState) => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(URL);
  const data = await response.json();
  const expense = {
    ...expenseData,
    exchangeRates: data,
  };
  const globalState = getState();
  const update = [...globalState.wallet.expenses, expense];
  dispatch(updateExpensesAction(update));
};
