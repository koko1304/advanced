import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

// Components
import App from './components/app';
import Header from './containers/header';
import Signin from './containers/signin';
import Signout from './containers/signout';
import Signup from './containers/signup';
import DashBoard from './containers/dashboard';

// Higher Order Components
import RequiredAuth from './hocs/required-auth';

// Combine Reducers
import reducers from './reducers';

// Create Redux Store With Middlewares
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// Redux Store
const store = createStoreWithMiddleware(reducers);

// Token
const token = localStorage.getItem('token');

// Check to see if token still existed then we should give user
// to access protected routes
if (token) {
	store.dispatch({ type: 'AUTH', payload: true });
}

ReactDOM.render(
    <Provider store={store}>
    	<div>
		  	<BrowserRouter>
		  		<div>
		  			<Header />
		  			<div className="container py-5">
				    	<Switch>
				    		<Route path="/dashboard" component={RequiredAuth(DashBoard)} />
				    		<Route path="/signout" component={Signout} />
				    		<Route path="/signup" component={Signup} />
				    		<Route path="/signin" component={Signin} />
							<Route path="/" component={App} />
				    	</Switch>
			    	</div>
		    	</div>
		    </BrowserRouter>
	    </div>
    </Provider>
  , document.querySelector('.app'));
