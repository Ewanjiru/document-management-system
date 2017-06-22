import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function SignUpReducer(state = initialState.user, action) {
  switch (action.type) {
    case actionTypes.CREATE_USERS:
      return [
        ...state,
        Object.assign({}, action.data)
      ];
    default:
      return state;
  }
}
export default SignUpReducer;
