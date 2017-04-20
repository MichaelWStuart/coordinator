import { combineReducers } from 'redux';

import userReducer from './user';
import pollsReducer from './polls';
import errorReducer from './error';

export default combineReducers({
  user: userReducer,
  polls: pollsReducer,
  error: errorReducer,
});
