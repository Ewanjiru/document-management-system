import { combineReducers } from 'redux';
import documents from './DocumentsReducer';
import user from './SignUpReducer';
import users from './UsersReducer';
import session from './LogInReducer';

const RootReducer = combineReducers({
  documents,
  user,
  session,
  users,
});

export default RootReducer;
