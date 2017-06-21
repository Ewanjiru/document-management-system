import axios from 'axios';

export const SIGN_UP = 'SIGN_UP';

export const SignUpAction = (profile) => {
  const request = axios.post('/users', profile)
  .then((response) => {
    dispatch(createUser(response));
  }).catch((error) => {
    throw error;              
  });
  return {
    type: SIGN_UP,
    payload: request
  };
};

