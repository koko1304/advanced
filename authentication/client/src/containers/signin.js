import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

// Action Creators
import { signin, authError } from '../actions';

class Signin extends Component {
	createField({ input, label, Type, type, meta: { invalid, touched, error }}) {
		return (
			<div className="form-group">
				<label className="mb-0">
					{label}
					<Type 
					className={`form-control ${ (invalid && touched) ? 'is-invalid' : '' }`}
					type={type}
					{...input} />
					<p className="invalid-feedback m-0">{ touched ? error : '' }</p>
				</label>
			</div>
		);
	}

	componentWillUnmount() {
		this.props.authError("");
	}

	handleSubmit({ email, password }) {
		this.props.signin(email, password, () => {
			
			this.props.history.push('/dashboard');
		});
	}

	alertError() {
		const { authErr } = this.props;

		if (authErr) {
			return <p className="alert alert-danger">{authErr}</p>;
		}
	}

	render() {
		return (
			<div className="sign-form">
				<div className="form-container">
					<h1>Sign in</h1>
					<form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
						<Field name="email" label="Email:" Type="input" type="email" component={this.createField} />
						<Field name="password" label="Password:" Type="input" type="password" component={this.createField} />
						{this.alertError()}
						<button type="submit" className="btn btn-primary mr-3">Sign In</button>
						<Link className="btn btn-danger" to="/">Cancel</Link>
					</form>
				</div>
			</div>
		);
	}
}

function validation(values) {
	var errors = {};

	if (!values.email) {
		errors.email = 'Email is required!';
	}

	if (!values.password) {
		errors.password = 'Password is required!';
	}

	return errors;
}

export default reduxForm({
	validate: validation,
	form: 'signInForm'
})(connect(({ authErr }) => ({ authErr }), { signin, authError })(Signin));