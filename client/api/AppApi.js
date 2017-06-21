import axios from 'axios';

export default {
  getAllDocuments: () => {
    return axios
      .get('/documents')
      .then(response => response.data)
      .catch(error => error);
  }
};
