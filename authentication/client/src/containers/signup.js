import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

// Action Creators
import { signup, authError } from '../actions';

class Signup extends Component {

	componentWillUnmount() {
		this.props.authError("");
	}

	handleSubmit({ email, password }) {
		this.props.signup(email, password, () => {

			this.props.history.push('/dashboard');
		});
	}

	createField({ label, type, Type, input, meta: { touched, invalid, error }}) {
		return (
			<div className="form-group">
				<label>
					{label}
					<Type 
					type={type}
					{...input}
					className={`form-control ${ (invalid && touched) ? 'is-invalid' : '' }`}/>
					<p className="invalid-feedback m-0">{ touched ? error : ''}</p>
				</label>
			</div>
		);
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
					<h1>Sign Up</h1>
					<form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
						<Field name="email" Type="input" type="email" label="Email:" component={this.createField} />
						<Field name="password" Type="input" type="password" label="Password:" component={this.createField} />
						<Field name="confirmPassword" Type="input" type="password" label="Confirm Password:" component={this.createField} />
						{this.alertError()}
						<button className="btn btn-primary mr-3" type="submit">Sign Up</button>
						<Link className="btn btn-danger" to="/">Cancal</Link>
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

	if (!values.confirmPassword) {

		errors.confirmPassword = 'Confirm Password is required!';
		
	} else if (values.password !== values.confirmPassword) {

		errors.confirmPassword = 'Confirm Password is not match to password';
	}

	return errors;
}

export default reduxForm({
	form: 'signUpForm',
	validate: validation
})(connect(({authErr}) => ({authErr}), { signup, authError })(Signup))