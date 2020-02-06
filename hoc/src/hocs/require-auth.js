import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

	class Authentication extends Component {
		componentWillMount() {
			this.props.auth || this.props.history.push('/');
		}

		componentWillUpdate(nextProps) {
			nextProps.auth || this.props.history.push('/');
		}

		render() {
			return <ComposedComponent {...this.props} />;
		}
	}

	return connect(({auth}) => ({auth}))(Authentication);
};