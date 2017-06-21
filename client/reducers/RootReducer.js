import { combineReducers } from 'redux';
import documents from './DocumentsReducer';

const RootReducer = combineReducers({
  documents,
});

export default RootReducer;
