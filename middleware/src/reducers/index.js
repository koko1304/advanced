import { combineReducers } from 'redux';

// Reducers
import Users from './users';

const rootReducer = combineReducers({
  users: Users
});

export default rootReducer;
