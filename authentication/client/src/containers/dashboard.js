import React, { Component } from 'react';
import { connect } from 'react-redux';

// Action Creators
import { fetchSecretData } from '../actions';

class DashBoard extends Component {
	componentWillMount() {
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

export default connect(({secretData}) => ({secretData}), { fetchSecretData })(DashBoard);