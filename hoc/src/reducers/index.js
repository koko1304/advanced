import { combineReducers } from 'redux';

// Reducers
import Auth from './auth';

const rootReducer = combineReducers({
  auth: Auth
});

export default rootReducer;
