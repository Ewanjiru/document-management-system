import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';


export function createdRole(roles) {
  return { type: actionTypes.CREATED_ROLE_SUCCESS, roles };
}

export function loadRolesSuccess(roles) {
  return { type: actionTypes.LOAD_ROLES_SUCCESS, roles };
}

export function deletedRoleById(roles) {
  return { type: actionTypes.DELETED_ROLE_SUCCESS, roles };
}

export function getError(error) {
  return { type: actionTypes.ERROR_MESSAGE, error };
}

export const newRole = records => (dispatch) => appApi.createRole(records)
  .then((response) => {
    dispatch(createdRole(response));
    dispatch(getError(response.message));
  })
  .catch((error) => { throw (error); });

export const loadRoles = () => {
  return function (dispatch) {
    return appApi.getAllRoles()
      .then((roles) => {
        dispatch(loadRolesSuccess(roles));
      })
      .catch((error) => { throw (error); });
  };
};

export const deleteRole = (id) => (dispatch) => {
  return appApi.deleteRoleById(id)
    .then((response) => {
      //dispatch(deletedRoleById(response));
      dispatch(getError(response.data.message));
    })
    .catch((error) => { throw (error); });
};
