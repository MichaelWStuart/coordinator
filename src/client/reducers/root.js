import { combineReducers } from 'redux';

import userReducer from './user';
import errorReducer from './error';
import searchReducer from './search';

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  search: searchReducer,
});
