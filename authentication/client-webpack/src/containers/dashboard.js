import React, { Component } from 'react';
import { connect } from 'react-redux';

// Action Creators
import { fetchSecretData } from '../actions';

class DashBoard extends Component {
	// Will be run before running render function
	componentWillMount() {

		// Call action creator to perform it action
		this.props.fetchSecretData();
	}

	render() {
		return (
			<div>
				<h1>DASHBOARD</h1>
				<p>{this.props.secretData.message}</p>
			</div>
		);
	}
}

// connect using to access to action creators and redux state
export default connect(({secretData}) => ({secretData}), { fetchSecretData })(DashBoard);