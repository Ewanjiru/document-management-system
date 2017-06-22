import { browserHistory } from 'react-router';
import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function LogInReducer(state = initialState.session, action) {
  switch (action.type) {
    case actionTypes.LOG_USER:
      browserHistory.push('/documents');
      return sessionStorage.Token;
    default:
      return state;
  }
}
export default LogInReducer;
