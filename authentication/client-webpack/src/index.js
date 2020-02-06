// Frameworks
import React from 'react';
import ReactDOM from 'react-dom';
// Provider is using to distribute store to all connect function
import { Provider } from 'react-redux';
// createStore is using to create redux store to hold all redux states

// applyMiddleware is using to apply middleware to redux store and perform action
// between action creators and reducers
import { createStore, applyMiddleware } from 'redux';
// BrowserRouter is using to distribute Route function to child components
// Route is using to create a Route handler for component
// Switch using to decide which route should be render
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// reduxThunk is a middleware to allow action creators the ability to using dispatch
import reduxThunk from 'redux-thunk';
// Using to apply dynamic import for component
import Loadable from 'react-loadable';

// Components
import App from './components/app';
import Header from './containers/header';

// Higher Order Components
// This HOC is using for checking authentication for each component before render
import RequiredAuth from './hocs/required-auth';

// Import Combine Reducers for apply to redux store
import reducers from './reducers';

// Create Redux Store and apply Middlewares
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

// Redux Store is hold all the redux states and action creators
const store = createStoreWithMiddleware(reducers);

// Get token from localStorage
const token = localStorage.getItem('token');

// Check to see if token still existed then we should give user
// to access protected routes
if (token) {
	store.dispatch({ type: 'AUTH', payload: true });
}

// Dynamic Import Components
const Signin = Loadable({
  // Specify component to be dynamic load
  loader: () => import('./containers/signin'),
  // Specify JSX to be load when component is pending
  loading: () => {
    return <div>Loading...</div>
  }
});

const Signout = Loadable({
  loader: () => import('./containers/signout'),
  loading: () => {
    return <div>Loading...</div>
  }
});

const Signup = Loadable({
  loader: () => import('./containers/signup'),
  loading: () => {
    return <div>Loading...</div>
  }
});

const DashBoard = Loadable({
  loader: () => import('./containers/dashboard'),
  loading: () => {
    return <div>Loading...</div>
  }
});

// ReactDOM.render() take jsx and render it to .app element
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