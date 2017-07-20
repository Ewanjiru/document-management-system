import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function createdDocument(records) {
  return { type: actionTypes.CREATED_DOCUMENT_SUCCESS, records };
}

export function loadDocumentsSuccess(docs) {
  return { type: actionTypes.LOAD_DOCUMENTS_SUCCESS, docs };
}

export function getCountSuccess(count) {
  return { type: actionTypes.LOAD_COUNT_SUCCESS, count };
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

export function getError(error) {
  return { type: actionTypes.ERROR_MESSAGE, error };
}

export const newDocument = records => dispatch => appApi.createDocument(records)
  .then((response) => {
    dispatch(createdDocument(response));
    dispatch(getError(response.message));
  })
  .catch((error) => { dispatch(getError(error)); });

export const loadDocuments = (limit, offset) => dispatch => appApi.getAllDocuments(limit, offset)
  .then((docs) => {
    dispatch(loadDocumentsSuccess(docs.data.doc));
  })
  .catch((error) => { dispatch(getError(error)); });

export const countDocuments = () => dispatch => appApi.getDocsCount()
    .then((response) => {
      dispatch(getCountSuccess(response.data.doc.count));
    })
    .catch((error) => { throw (error); });

export const loadMyDocuments = token => dispatch => appApi.getAllDocumentsByUser(token)
    .then((docs) => {
      dispatch(loadMyDocumentsSuccess(docs.userDocuments));
    })
    .catch((error) => { throw error; });

export const loadRoleDocuments = token => dispatch => appApi.getAllDocumentsRole(token)
    .then((docs) => {
      dispatch(loadMyDocumentsSuccess(docs));
    })
    .catch((error) => { throw error; });

export const viewDocument = id => dispatch => appApi.getDocumentById(id)
    .then((doc) => {
      dispatch(loadDocumentByIdSuccess(doc));
    })
    .catch((error) => { throw (error); });

export const searchDocument = searchText => dispatch => appApi.getSearched(searchText)
    .then((docs) => {
      if (docs.length > 0) {
        dispatch(loadSearchedSuccess(docs));
      } else {
        dispatch(getError(docs.response.data.message));
      }
    })
    .catch((error) => { dispatch(getError(error)); });

export const editDocument = (id, record) => dispatch => appApi.updateDocument(id, record)
  .then((response) => {
    dispatch(updatedDocument(response)).then(() => {
      dispatch(getError(response.message));
    });
  })
  .catch((error) => { throw (error); });

export const deleteDocument = id => dispatch => appApi.deleteById(id)
  .then((response) => {
    dispatch(deletedById(response));
    dispatch(getError(response.data.message));
  })
  .catch((error) => { throw (error); });
