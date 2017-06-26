import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function createdDocument(records) {
  return { type: actionTypes.CREATED_DOCUMENT_SUCCESS, records };
}

export function loadDocumentsSuccess(docs) {
  return { type: actionTypes.LOAD_DOCUMENTS_SUCCESS, docs };
}

export function loadMyDocumentsSuccess(docs) {
  return { type: actionTypes.LOADMY_DOCUMENTS_SUCCESS, docs };
}

export function loadDocumentByIdSuccess(doc) {
  console.log("I was here");
  return { type: actionTypes.LOAD_DOCUMENTBYID_SUCCESS, doc };
}

export function updatedDocument(response) {
  console.log("We are almost", response);
  return { type: actionTypes.UPDATED_DOCUMENT_SUCCESS, response };
}

export function deletedById(response) {
  console.log("We are almost", response);
  return { type: actionTypes.DELETED_DOCUMENT_SUCCESS, response };
}

export const newDocument = (records) => (dispatch) => {
  return appApi.createDocument(records)
    .then((response) => {
      dispatch(createdDocument(response));
    })
    .catch((error) => { throw (error); });
};

export const loadDocuments = () => {
  console.log("Loaddocuments was called api")
  return function (dispatch) {
    return appApi.getAllDocuments()
      .then((docs) => {
        dispatch(loadDocumentsSuccess(docs.data));
      })
      .catch((error) => { throw (error); });
  };
};

export const loadMyDocuments = (token) => {
  return function (dispatch) {
    return appApi.getAllDocumentsByUser(token)
      .then((docs) => {
        dispatch(loadMyDocumentsSuccess(docs.userDocuments));
      })
      .catch((error) => { throw (error); });
  };
};

export const viewDocument = (id) => {
  return function (dispatch) {
    return appApi.getDocumentById(id)
      .then((doc) => {
        console.log("I was called with", doc);

        dispatch(loadDocumentByIdSuccess(doc));
      })
      .catch((error) => { throw (error); });
  };
};

export const editDocument = (id, record) => (dispatch) => {
  console.log(record);
  return appApi.updateDocument(id, record)
    .then((response) => {
      dispatch(updatedDocument(response));
    })
    .catch((error) => { throw (error); });
};

export const deleteDocument = (id) => (dispatch) => {
  return appApi.deleteById(id)
    .then((response) => {
      dispatch(deletedById(response));
    })
    .catch((error) => { throw (error); });
};

