import axios from 'axios';
import authenticate from './helper';

export default {
  getAllDocuments: (limit = 7, offset = 0) => {
    return axios
      .get(`/documents/?limit=${limit}&offset=${offset}`, { headers: { 'x-access-token': sessionStorage.Token } });
  },

  getAllDocs: () => {
    return axios
      .get('/documents/', { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => error);
  },

  getDocsCount: () => {
    return axios
      .get('/count/documents', { headers: { 'x-access-token': sessionStorage.Token } });
  },

  getMyDocsCount: (token) => {
    const userdetails = authenticate(token);
    const userid = userdetails.id;
    return axios
      .get(`/count/users/${userid}/documents/`, { headers: { 'x-access-token': sessionStorage.Token } });
  },

  getSearched: (searchtitle) => {
    return axios
      .get(`/search/documents/?q=${searchtitle}`, { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => error)
  },

  getDocumentById: (id) => axios
    .get(`/documents/${id}`, { headers: { 'x-access-token': sessionStorage.Token } })
    .then(response => response.data)
    .catch(error => error),

  getAllDocumentsByUser: (token, limit = 7, offset = 0) => {
    const userdetails = authenticate(token);
    const userid = userdetails.id;
    return axios
      .get(`/users/${userid}/documents/?limit=${limit}&offset=${offset}`, { headers: { 'x-access-token': token } })
      .then(response => response.data)
      .catch(error => error);
  },

  getAllDocumentsRole: (token) => {
    const userdetails = authenticate(token);
    const role = userdetails.roleType;
    return axios
      .get(`/role/documents/${role}`, { headers: { 'x-access-token': token } })
      .then(response => response.data.docs)
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
    return axios
      .get(`/users/?limit=${limit}&offset=${offset}`, { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => error);
  },

  getUsersCount: () => {
    return axios
      .get('/count/users', { headers: { 'x-access-token': sessionStorage.Token } });
  },

  getSearchedUser: (searchtitle) => axios
    .get(`/search/users/?q=${searchtitle}`, { headers: { 'x-access-token': sessionStorage.Token } })
    .then(response => response.data)
    .catch(error => error),

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
    return request.then(response => response.data).catch(error => error);
  },

  createRole: (role) => {
    const request = axios({
      method: 'POST',
      data: role,
      url: '/roles',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return request.then(response => response.data).catch(error => error);
  },

  getAllRoles: () => {
    return axios
      .get('/roles/')
      .then(response => response.data)
      .catch(error => error);
  },

  deleteRoleById: (id) => {
    const request = axios({
      method: 'DELETE',
      url: `/roles/${id}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return request.then(response => response).catch(error => error);
  },
};
