import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function loadUsersSuccess(users) {
  return { type: actionTypes.LOAD_USERS_SUCCESS, users };
}

export function UserSearchedSuccess(users) {
  return { type: actionTypes.SEARCH_USERS_SUCCESS, users };
}

export function getCountSuccess(count) {
  console.log('niko hapa', count);
  return { type: actionTypes.LOAD_COUNT_SUCCESS, count };
}

export function loadUserByIdSuccess(user) {
  console.log("I was here");
  return { type: actionTypes.LOAD_USERBYID_SUCCESS, user };
}

export function updatedUser(response) {
  return { type: actionTypes.UPDATED_USER_SUCCESS, response };
}

export function deletedUserById(response) {
  console.log("We are almost", response);
  return { type: actionTypes.DELETED_USER_SUCCESS, response };
}

export const loadUsers = (limit, offset) => {
  return function (dispatch) {
    return appApi.getAllUsers(limit, offset)
      .then((users) => {
        console.log('users are ', users);
        dispatch(loadUsersSuccess(users));
      })
      .catch((error) => { throw (error); });
  };
};

export const searchUser = (searchText) => function (dispatch) {
  return appApi.getSearchedUser(searchText)
    .then((users) => {
      dispatch(UserSearchedSuccess(console.log('here', users)));
    })
    .catch((error) => { throw (error); });
};

export const viewUser = (id) => {
  return function (dispatch) {
    return appApi.getUserById(id)
      .then((user) => {
        console.log("I was called with", user);
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
      dispatch(updatedUser(response));
    })
    .catch((error) => { throw (error); });
};

export const deleteUser = (id) => (dispatch) => {
  console.log('niko hapa', id);
  return appApi.deleteUserById(id)
    .then((response) => {
      dispatch(deletedUserById(response));
    })
    .catch((error) => { throw (error); });
};
