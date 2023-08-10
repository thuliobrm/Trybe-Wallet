import {
  UPDATE_EXPENSES,
  UPDATE_CURRENCY,
  REQUEST_EDIT_EXPENSES,
  CLOSE_REQUEST_EDIT } from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const updateState = {
    ...state,
    ...action.payload,
  };
  switch (action.type) {
  case UPDATE_CURRENCY:
    return updateState;

  case UPDATE_EXPENSES:
    return updateState;

  case REQUEST_EDIT_EXPENSES:
    return updateState;

  case CLOSE_REQUEST_EDIT:
    return updateState;
  default:
    return state;
  }
};

export default walletReducer;
