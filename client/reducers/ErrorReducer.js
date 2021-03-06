import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function ErrorReducer(state = initialState.error, action) {
  switch (action.type) {
    case actionTypes.ERROR_MESSAGE:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
}
export default ErrorReducer;
