import React, { Component } from 'react';
import { connect } from 'react-redux';

// Action Creator
import { signout } from '../actions';

class Signout extends Component {
	componentWillMount() {
		this.props.signout(() => {
			this.props.history.push('/');
		});
	}

	render() {
		return (
			<div></div>
		);
	}
}

export default connect(null, { signout })(Signout);