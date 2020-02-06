import { combineReducers } from 'redux';

// Redux Form
import { reducer as formReducer } from 'redux-form';

// Reducers
import Auth from './auth';
import AuthErr from './auth-error';
import FetchSecretData from './fetch-secret-data';

const rootReducer = combineReducers({
  form: formReducer,
  auth: Auth,
  authErr: AuthErr,
  secretData: FetchSecretData
});

export default rootReducer;
