import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

// Action Creators
import { signup, authError } from '../actions';

class Signup extends Component {

	// When component will remove from the dom so run this function
	componentWillUnmount() {

		// call the action creator to clear the error message
		this.props.authError("");
	}

	// Run when form is valid to submit
	handleSubmit({ email, password }) {

		// call the action creator to sign up the user
		this.props.signup(email, password, () => {

			// when sign up is complete redirect user to dashboard route
			this.props.history.push('/dashboard');
		});
	}

	// This function will receive alot of parameters from redux Field
	createField({ label, type, Type, input, meta: { touched, invalid, error }}) {
		return (
			<div className="form-group">
				<label>
					{label}
					<Type 
					type={type}
					{...input}
					// if input is invalid and already touched so show the class of is-invalid
					className={`form-control ${ (invalid && touched) ? 'is-invalid' : '' }`}/>

					{/* don't show the error message until user touched the input */}
					<p className="invalid-feedback m-0">{ touched ? error : ''}</p>
				</label>
			</div>
		);
	}

	// Return an alert if there is an error from the response
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
					{/* this.props.handleSubmit is an redux form function to handle onSubmit event */}
					<form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>

						{/* Field is using to create each input field */}
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

// This function will be call everytime user perform an action on the input field
function validation(values) {
	var errors = {};

	if (!values.email) {

		// if errors.email is set to value so the corresponse field will receive this error message
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

// pass a unique form name and validate function
export default reduxForm({
	form: 'signUpForm',
	validate: validation
})(connect(({authErr}) => ({authErr}), { signup, authError })(Signup))