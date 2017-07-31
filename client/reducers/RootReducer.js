import { combineReducers } from 'redux';
import documents from './DocumentsReducer';
import user from './SignUpReducer';
import users from './UsersReducer';
import session from './LogInReducer';
import error from './ErrorReducer';
import roles from './RoleReducers';
import count from './Count';

const RootReducer = combineReducers({
  documents,
  user,
  session,
  users,
  roles,
  error,
  count,
});

export default RootReducer;
