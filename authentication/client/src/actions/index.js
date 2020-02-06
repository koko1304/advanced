// Frameworks
import axios from 'axios';

// Variables
const ROOT_URL = 'http://localhost:8090/';

export function fetchSecretData() {
	return dispatch => {
		axios.get(ROOT_URL, { headers: { authorization: localStorage.getItem('token') }})
			.then(response => {
				
				dispatch({
					type: 'FETCH_SECRET_DATA',
					payload: response.data
				});
			});
	}
}

export function signin(email, password, cb) {
	return dispatch => {
		axios.post(`${ROOT_URL}signin`, { email, password })
			.then(response => {

				localStorage.setItem('token', response.data.token);

				dispatch({ type: 'AUTH', payload: true });

				cb();
			})
			.catch(() => {

				dispatch(authError('Email or Password is not correct!'));
			});
	}
}

export function authError(err) {
	return {
		type: 'AUTH_ERROR',
		payload: err
	}
}

export function signout(cb) {
	return dispatch => {

		localStorage.removeItem('token');

		dispatch({
			type: "AUTH",
			payload: false
		});

		cb();
	};
}

export function signup(email, password, cb) {
	return dispatch => {
		axios.post(`${ROOT_URL}signup`, { email, password })
			.then(response => {
				
				localStorage.setItem('token', response.data.token);

				dispatch({ type: 'AUTH', payload: true });

				cb();
			})
			.catch((err) => {

				dispatch(authError(err.response.data.err));
			});
	}
}