// Frameworks
import React, { Component } from 'react';

// Containers
import UsersList from '../containers/users-list';

export default class App extends Component {
  render() {
    return (
    	<div className="my-5">
    		<h1 className="text-center mb-4">Users List</h1>
      		<UsersList />
      	</div>
    );
  }
}
