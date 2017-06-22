import { combineReducers } from 'redux';
import documents from './DocumentsReducer';
import user from './SignUpReducer';
import session from './LogInReducer';

const RootReducer = combineReducers({
  documents,
  user,
  session,
});

export default RootReducer;
