import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';


export function createdRole(records) {
  return { type: actionTypes.CREATED_ROLE_SUCCESS, records };
}

export function loadRolesSuccess(roles) {
  console.log("We are almost", roles);
  return { type: actionTypes.LOAD_ROLES_SUCCESS, roles };
}

export function deletedRoleById(response) {
  console.log("We are almost", response);
  return { type: actionTypes.DELETED_ROLE_SUCCESS, response };
}

export const newRole = records => (dispatch) => appApi.createRole(records)
  .then((response) => {
    dispatch(createdRole(response));
  })
  .catch((error) => { throw (error); });

export const loadRoles = () => {
  return function (dispatch) {
    return appApi.getAllRoles()
      .then((roles) => {
        console.log('users are ', roles);
        dispatch(loadRolesSuccess(roles));
      })
      .catch((error) => { throw (error); });
  };
};

export const deleteRole = (id) => (dispatch) => {
  console.log('niko hapa', id);
  return appApi.deleteRoleById(id)
    .then((response) => {
      dispatch(deletedRoleById(console.log('message', response)));
    })
    .catch((error) => { throw (error); });
};
