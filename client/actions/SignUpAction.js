import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function createdUser(user) {
  return { type: actionTypes.CREATE_USERS, user };
}

export function loggedUser() {
  return { type: actionTypes.LOG_USER };
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
          dispatch(loggedUser(response));
        }else{
          console.log("error occured");
        }
      })
      .catch((error) => { throw (error); });
};
