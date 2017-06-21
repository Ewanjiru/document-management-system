import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function DocumentsReducer(state = initialState.documents, action) {
  switch (action.type) {
    case actionTypes.LOAD_DOCUMENTS_SUCCESS:
      return action.docs;
    default:
      return state;
  }
}
export default DocumentsReducer;
