import React, { Component } from 'react';
import { connect } from 'react-redux';

// This is a higher order component
// it just a function that take component as it parameter
export default function(ComposedComponent) {

	class RequiredAuth extends Component {

		// Check to see, is user already authenticate ?
		// if not redirect user back to root route
		componentWillMount() {
			if (!this.props.auth) {
				this.props.history.push('/');
			}
		}

		// Check to see again, is user still authenticate ?
		// if not redirect user back to root route
		componentWillUpdate(nextProps) {
			if (!nextProps.auth) {
				this.props.history.push('/');
			}
		}

		render() {
			// if user not yet authenticate so show nothing
			if (!this.props.auth) {
				return <div></div>;
			}
			
			// if user already authenticate so show the component to user
			return <ComposedComponent {...this.props} />;
		}
	}

	// require auth state from redux store
	return connect(({auth}) => ({auth}))(RequiredAuth);
}