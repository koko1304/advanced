import { combineReducers } from 'redux';

// Redux Form reducer
import { reducer as formReducer } from 'redux-form';

// Import all different Reducers
import Auth from './auth';
import AuthErr from './auth-error';
import FetchSecretData from './fetch-secret-data';

// combineReducers using to combine multiply reducers
// Note: single reducer no need to using this function just pass it directly to redux store
const rootReducer = combineReducers({
  form: formReducer,
  auth: Auth,
  authErr: AuthErr,
  secretData: FetchSecretData
});

export default rootReducer;
