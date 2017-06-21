import * as actionTypes from './ActionTypes';
import appApi from '../api/AppApi';

export function loadDocumentsSuccess(docs) {
  return { type: actionTypes.LOAD_DOCUMENTS_SUCCESS, docs };
}

export default function loadDocuments() {
  return function (dispatch) {
    return appApi.getAllDocuments()
      .then((docs) => {
        dispatch(loadDocumentsSuccess(docs));
      })
      .catch((error) => { throw (error); });
  };
}
