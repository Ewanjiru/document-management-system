import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function UsersReducer(state = initialState.users, action) {
  console.log('reduce2', action);
  switch (action.type) {
    case actionTypes.LOAD_USERS_SUCCESS:
      console.log('ivi ndo iko', action.users);
      return {
        all: action.users,
        byId: state.byId
      };
    case actionTypes.LOAD_USERBYID_SUCCESS:
      return {
        all: state.all,
        byId: action.user
      };
    case actionTypes.SEARCH_USERS_SUCCESS:
      return {
        all: action.users,
        byId: state.byId
      };
    case actionTypes.UPDATED_USER_SUCCESS:
      return {
        all: state.all,
        byId: action.records
      };
    case actionTypes.DELETED_USER_SUCCESS:
      return {
        all: state.all,
        byId: action.response
      };
    default:
      return state;
  }
}
export default UsersReducer;
