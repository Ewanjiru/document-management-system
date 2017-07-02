import { combineReducers } from 'redux';
import documents from './DocumentsReducer';
import user from './SignUpReducer';
import users from './UsersReducer';
import session from './LogInReducer';
import error from './ErrorReducer';
import roles from './RoleReducers';

const RootReducer = combineReducers({
  documents,
  user,
  session,
  users,
  roles,
  error
});

export default RootReducer;
