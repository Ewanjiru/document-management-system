import axios from 'axios';
import authenticate from './helper';

export default {
  getAllDocuments: (limit = 7, offset = 0) => axios
    .get(`/documents/?limit=${limit}&offset=${offset}`, { headers: { 'x-access-token': sessionStorage.Token } })
  // .then(response => response.data)
  // .catch(error => console.log(error));
  ,

  getSearched: (searchtitle) => {
    return axios
      .get(`/search/documents/?q=${searchtitle}`, { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => error);
  },

  getDocumentById: id => axios
    .get(`/documents/${id}`, { headers: { 'x-access-token': sessionStorage.Token } })
    .then(response => response.data)
    .catch(error => error),

  getAllDocumentsByUser: (token) => {
    const userdetails = authenticate(token);
    const userid = userdetails.id;
    return axios
      .get(`/users/${userid}/documents`, { headers: { 'x-access-token': token } })
      .then(response => response.data)
      .catch(error => error);
  },

  createDocument: (records) => {
    const request = axios({
      method: 'POST',
      data: records,
      url: '/documents',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.Token
      }
    });
    return request.then(response => response.data).catch(error => error);
  },

  updateDocument: (id, record) => {
    const request = axios({
      method: 'PUT',
      data: record,
      url: `/documents/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.Token
      }
    });
    return request.then(response => response.data).catch(error => error);
  },

  deleteById: (id) => {
    const request = axios({
      method: 'DELETE',
      url: `/documents/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.Token
      },
    });
    return request.then(response => response).catch(error => error);
  },

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

  getAllUsers: (limit = 7, offset = 0) => {
    console.log('api');
    return axios
      .get(`/users/?limit=${limit}&offset=${offset}`, { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => console.log(error));
  },

  getSearchedUser: (searchtitle) => {
    return axios
      .get(`/search/users/?q=${searchtitle}`, { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => error);
  },

  getUserById: id => axios
    .get(`/users/${id}`, { headers: { 'x-access-token': sessionStorage.Token } })
    .then(response => response.data)
    .catch(error => error),

  deleteUserById: (id) => {
    const request = axios({
      method: 'DELETE',
      url: `/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.Token
      },
    });
    return request.then(response => response).catch(error => error);
  },
  updateUser: (id, record) => {
    console.log('We will update with', id, record);
    const request = axios({
      method: 'PUT',
      data: record,
      url: `/users/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.Token
      }
    });
    return request.then(response => response.data).catch(error => error);
  },

  logoutUser: (token) => {
    const request = axios({
      method: 'POST',
      data: token,
      url: '/users/logout',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.then(response => console.log('token is ', response.data)).catch(error => error);
  },
};

