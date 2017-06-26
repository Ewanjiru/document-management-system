import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function DocumentsReducer(state = initialState.documents, action) {
  switch (action.type) {
    case actionTypes.LOAD_DOCUMENTS_SUCCESS:
      return {
        all: action.docs,
        byId: state.byId
      };
    case actionTypes.LOADMY_DOCUMENTS_SUCCESS:
      return {
        all: action.docs,
        byId: state.byId
      };
    case actionTypes.LOAD_DOCUMENTBYID_SUCCESS:
      return {
        all: state.all,
        byId: action.doc
      };
    case actionTypes.UPDATED_DOCUMENT_SUCCESS:
      return {
        all: state.all,
        byId: action.records
      };
    case actionTypes.CREATED_DOCUMENT_SUCCESS:
      return {
        all: state.all,
        byId: action.records
      };
    case actionTypes.DELETED_DOCUMENT_SUCCESS:
      return {
        all: state.all,
        byId: action.response
      };
    default:
      return state;
  }
}
export default DocumentsReducer;
