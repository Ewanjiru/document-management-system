import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function UsersReducer(state = initialState.users, action) {
  switch (action.type) {
    case actionTypes.LOAD_USERS_SUCCESS:
      return Object.assign({}, state, {
        all: action.users,
        byId: state.byId
      });
    case actionTypes.LOAD_USERBYID_SUCCESS:
      return Object.assign({}, state, {
        all: state.all,
        byId: action.user
      });
    case actionTypes.SEARCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        all: action.users,
        byId: state.byId
      });
    case actionTypes.UPDATED_USER_SUCCESS:
      return Object.assign({}, state, {
        all: state.all,
        byId: action.records
      });
    case actionTypes.DELETED_USER_SUCCESS:
      return Object.assign({}, state, {
        all: state.all,
        byId: action.response
      });
    default:
      return state;
  }
}
export default UsersReducer;
