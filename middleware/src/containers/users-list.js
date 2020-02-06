// Frameworks
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

// Action Creators
import { fetchUsers } from '../actions';

class UsersList extends Component {
	componentWillMount() {
		this.props.fetchUsers();
	}

	createUserItems() {
		return _.map(this.props.users, (user, key) => {
			return (
				<li key={key} className="col-md-3 mb-4">
					<div className="card">
					  <img src="http://lorempixel.com/250/200" className="img-fluid" alt="demo image"/>
					  <div className="card-body">
					    <h5 className="card-title">{user.name}</h5>
					    <p><b>Email:</b> {user.email}</p>
					    <p><b>Phone:</b> {user.phone}</p>
					    <a href={`mailto:${user.email}`} className="btn btn-primary">Email</a>
					  </div>
					</div>
				</li>
			);
		});
	}

	render() {
		return (
			<ul style={{ listStyleType: 'none', padding: 0 }} className="row">
				{this.createUserItems.call(this)}
			</ul>
		);
	}
}

export default connect(({users}) => ({users}), { fetchUsers })(UsersList);