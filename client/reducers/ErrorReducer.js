import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function ErrorReducer(state = initialState.error, action) {
  console.log('hapa nimefika aaa', action);
  switch (action.type) {
    case actionTypes.ERROR_MESSAGE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
export default ErrorReducer;
