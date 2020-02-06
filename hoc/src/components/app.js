import React, { Component } from 'react';

// Components
import Header from './header';

export default class App extends Component {
  render() {
    return (
      <div>
      	<Header />
      	<div className="container">
			     <h1>Index Page</h1>
      	</div>
      </div>
    );
  }
}
