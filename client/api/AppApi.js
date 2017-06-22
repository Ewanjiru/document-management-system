import axios from 'axios';

export default {
  getAllDocuments: () => axios
      .get('/documents')
      .then(response => response.data)
      .catch(error => error),

  createUser: (user) => {
    const request = axios({
      method: 'POST',
      data: user,
      url: '/users',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return request.then(response => response.data).catch(error => error);
  },

  logUser: (user) => {
    const request = axios({
      method: 'POST',
      data: user,
      url: '/users/login',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.then(response => response.data).catch(error => error);
  },

  createDocument: (records) => {
    const request = axios({
      method: 'POST',
      data: records,
      url: '/documents',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return request.then(response => response.data).catch(error => error);
  },
};
