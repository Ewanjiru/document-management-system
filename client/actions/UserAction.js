import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function loadUsersSuccess(users) {
  return { type: actionTypes.LOAD_USERS_SUCCESS, users };
}

export function UserSearchedSuccess(users) {
  return { type: actionTypes.SEARCH_USERS_SUCCESS, users };
}

export function getCountSuccess(count) {
  return { type: actionTypes.LOAD_COUNT_SUCCESS, count };
}

export function loadUserByIdSuccess(user) {
  return { type: actionTypes.LOAD_USERBYID_SUCCESS, user };
}

export function updatedUser(response) {
  return { type: actionTypes.UPDATED_USER_SUCCESS, response };
}

export function deletedUserById(response) {
  return { type: actionTypes.DELETED_USER_SUCCESS, response };
}

export function getError(error) {
  return { type: actionTypes.ERROR_MESSAGE, error };
}

export const loadUsers = (limit, offset) => {
  return function (dispatch) {
    return appApi.getAllUsers(limit, offset)
      .then((users) => {
        if (users.length > 0) {
          dispatch(loadUsersSuccess(users));
        } else {
          dispatch(getError(users.response.data.message));
        }
      })
      .catch((error) => { throw (error); });
  };
};

export const searchUser = (searchText) => function (dispatch) {
  return appApi.getSearchedUser(searchText)
    .then((users) => {
      if (users.length > 0) {
        dispatch(UserSearchedSuccess(users));
      } else {
        dispatch(getError(users.response.data.message));
      }
    })
    .catch((error) => { throw (error); });
};

export const viewUser = (id) => {
  return function (dispatch) {
    return appApi.getUserById(id)
      .then((user) => {
        dispatch(loadUserByIdSuccess(user));
      })
      .catch((error) => { throw (error); });
  };
};

export const countUsers = () => function (dispatch) {
  return appApi.getUsersCount()
    .then((response) => {
      dispatch(getCountSuccess(response.data.user.count));
    })
    .catch((error) => { throw (error); });
};


export const editUser = (id, record) => (dispatch) => {
  return appApi.updateUser(id, record)
    .then((response) => {
      //dispatch(updatedUser(response));
      dispatch(getError(response.message));
    })
    .catch((error) => { throw (error); });
};

export const deleteUser = (id) => (dispatch) => {
  return appApi.deleteUserById(id)
    .then((response) => {
      dispatch(getError(response.data.message));
    })
    .catch((error) => { throw (error); });
};
