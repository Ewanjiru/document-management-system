import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function createdDocument(records) {
  return { type: actionTypes.CREATED_DOCUMENT_SUCCESS, records };
}

export function loadDocumentsSuccess(docs) {
  return { type: actionTypes.LOAD_DOCUMENTS_SUCCESS, docs };
}

export const newDocument = (records) => (dispatch) => {
  return appApi.createDocument(records)
      .then((response) => {
        dispatch(createdDocument(response));
      })
      .catch((error) => { throw (error); });
};

export const loadDocuments = () => {
  return function (dispatch) {
    return appApi.getAllDocuments()
      .then((docs) => {
        dispatch(loadDocumentsSuccess(docs));
      })
      .catch((error) => { throw (error); });
  };
};
