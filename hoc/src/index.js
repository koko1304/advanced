// Frameworks
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import App from './components/app';
import Resources from './components/resources';
import Resources2 from './components/resources2';

// Higher Order Components
import requireAuth from './hocs/require-auth';

// Combine Reducers
import reducers from './reducers';

// Create Redux Store With Middleware
const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<BrowserRouter>
  		<Switch>
  			<Route path="/resources2" component={Resources2} />
  			<Route path="/resources" component={requireAuth(Resources)} />
    		<Route path="/" component={App} />
    	</Switch>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.app'));
