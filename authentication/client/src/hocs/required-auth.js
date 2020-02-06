import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class RequiredAuth extends Component {
		componentWillMount() {
			if (!this.props.auth) {
				this.props.history.push('/');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.auth) {
				this.props.history.push('/');
			}
		}

		render() {
			if (!this.props.auth) {
				return <div></div>;
			}
			
			return <ComposedComponent {...this.props} />;
		}
	}

	return connect(({auth}) => ({auth}))(RequiredAuth);
}