import { browserHistory } from 'react-router';
import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function createdUser(user) {
  return { type: actionTypes.CREATE_USERS, user };
}

export function loggedUser() {
  return { type: actionTypes.LOG_USER };
}

export function getError(error) {
  return { type: actionTypes.ERROR_MESSAGE, error };
}

export function loggedOutUser() {
  return { type: actionTypes.LOGOUT_USER };
}

export const SignUpAction = (user) => (dispatch) => {
  return appApi.createUser(user)
    .then((response) => {
      dispatch(createdUser(response));
    })
    .catch((error) => { throw (error); });
};

export const LoginAction = (user) => (dispatch) => {
  return appApi.logUser(user)
    .then((response) => {
      if (response.message === 'Loggin Successful.') {
        sessionStorage.setItem('Token', response.Token);
        browserHistory.push('/edocx/documents');
        dispatch(loggedUser(response));
      } else {
        console.log("error occured");
        dispatch(getError("confirm your credentials and try again"));
      }
    })
    .catch((error) => { throw (error); });
};

export const LogoutAction = (token) => (dispatch) => {
  console.log("I was called");
  return appApi.logoutUser(token)
    .then((response) => {
      sessionStorage.clear();
      dispatch(loggedOutUser(response));
    })
    .catch((error) => { throw (error); });
};
