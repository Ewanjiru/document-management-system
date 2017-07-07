import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function RoleReducer(state = initialState.roles, action) {
  console.log('iiii', action);
  switch (action.type) {
    case actionTypes.LOAD_ROLES_SUCCESS:
      return {
        roles: action.roles,
      };
    case actionTypes.CREATED_ROLE_SUCCESS:
      return {
        roles: action.roles,
      };
    case actionTypes.DELETED_ROLE_SUCCESS:
      return {
        roles: state,
      };
    default:
      return state;
  }
}
export default RoleReducer;
