import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function RoleReducer(state = initialState.roles, action) {
  switch (action.type) {
    case actionTypes.LOAD_ROLES_SUCCESS:
      return action.roles;
    case actionTypes.CREATED_ROLE_SUCCESS:
      return Object.assign({}, state, {
        roles: action.roles,
      });
    case actionTypes.DELETED_ROLE_SUCCESS:
      return Object.assign({}, state, {
        roles: state,
      });
    default:
      return state;
  }
}
export default RoleReducer;
