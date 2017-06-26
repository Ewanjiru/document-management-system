import axios from 'axios';

export default {
  getAllDocuments: () => {
    console.log('api');
    return axios
      .get('/documents', { headers: { 'x-access-token': sessionStorage.Token } });
    // .then(response => response.data)
    // .catch(error => console.log(error));
  },

  getDocumentById: id => axios
      .get(`/documents/${id}`, { headers: { 'x-access-token': sessionStorage.Token } })
      .then(response => response.data)
      .catch(error => error),

  getAllDocumentsByUser: (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const userid = JSON.parse(window.atob(base64)).id;
    return axios
      .get(`/users/${userid}/documents`, { headers: { 'x-access-token': token } })
      .then(response => response.data)
      .catch(error => error);
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
    console.log('We will update with', id, record);
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
};
