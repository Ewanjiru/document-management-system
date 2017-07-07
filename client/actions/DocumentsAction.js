import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function createdDocument(records) {
  return { type: actionTypes.CREATED_DOCUMENT_SUCCESS, records };
}

export function loadDocumentsSuccess(docs) {
  return { type: actionTypes.LOAD_DOCUMENTS_SUCCESS, docs };
}

export function loadAllDocumentsSuccess(docs) {
  console.log('niko hapa', docs);
  return { type: actionTypes.LOAD_ALL_DOCUMENTS_SUCCESS, docs };
}

export function getCountSuccess(count) {
  console.log('niko hapa', count);
  return { type: actionTypes.LOAD_COUNT_SUCCESS, count };
}

export function getSearchDocsSuccess(count) {
  console.log('niko hapa', count);
  return { type: actionTypes.LOAD_SEARCH_SUCCESS, count };
}

export function loadSearchedSuccess(docs) {
  return { type: actionTypes.LOAD_SEARCHDOCUMENTS_SUCCESS, docs };
}

export function loadMyDocumentsSuccess(docs) {
  return { type: actionTypes.LOADMY_DOCUMENTS_SUCCESS, docs };
}

export function loadDocumentByIdSuccess(doc) {
  return { type: actionTypes.LOAD_DOCUMENTBYID_SUCCESS, doc };
}

export function updatedDocument(response) {
  return { type: actionTypes.UPDATED_DOCUMENT_SUCCESS, response };
}

export function deletedById(response) {
  return { type: actionTypes.DELETED_DOCUMENT_SUCCESS, response };
}

export const newDocument = records => (dispatch) => appApi.createDocument(records)
  .then((response) => {
    dispatch(createdDocument(response));
  })
  .catch((error) => { throw (error); });

export const loadDocuments = (limit, offset) => function (dispatch) {
  return appApi.getAllDocuments(limit, offset)
    .then((docs) => {
      dispatch(loadDocumentsSuccess(docs.data.doc));
    })
    .catch((error) => { throw (error); });
};

// export const loadAllDocuments = () => function (dispatch) {
//   return appApi.getAllDocs()
//     .then((docs) => {
//       dispatch(loadAllDocumentsSuccess(docs));
//     })
//     .catch((error) => { throw (error); });
// };

export const countDocuments = () => function (dispatch) {
  return appApi.getDocsCount()
    .then((response) => {
      dispatch(getCountSuccess(response.data.doc.count));
    })
    .catch((error) => { throw (error); });
};

// export const getAllCountDocuments = () => function (dispatch) {
//   return appApi.getDocsCount()
//     .then((response) => {
//       dispatch(getSearchDocsSuccess(response.data.doc.rows));
//     })
//     .catch((error) => { throw (error); });
// };

export const loadMyDocuments = (token) => function (dispatch) {
  return appApi.getAllDocumentsByUser(token)
    .then((docs) => {
      dispatch(loadMyDocumentsSuccess(docs.userDocuments));
    })
    .catch((error) => { throw (error); });
};

export const loadRoleDocuments = (token) => function (dispatch) {
  return appApi.getAllDocumentsRole(token)
    .then((docs) => {
      dispatch(loadMyDocumentsSuccess(docs));
    })
    .catch((error) => { throw (error); });
};

export const viewDocument = (id) => function (dispatch) {
  return appApi.getDocumentById(id)
    .then((doc) => {
      dispatch(loadDocumentByIdSuccess(doc));
    })
    .catch((error) => { throw (error); });
};

export const searchDocument = (searchText) => function (dispatch) {
  return appApi.getSearched(searchText)
    .then((docs) => {
      dispatch(loadSearchedSuccess(docs));
    })
    .catch((error) => { throw (error); });
};

export const editDocument = (id, record) => (dispatch) => appApi.updateDocument(id, record)
  .then((response) => {
    dispatch(updatedDocument(response));
  })
  .catch((error) => { throw (error); });

export const deleteDocument = id => (dispatch) => appApi.deleteById(id)
  .then((response) => {
    dispatch(deletedById(response));
  })
  .catch((error) => { throw (error); });
