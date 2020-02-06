// Frameworks
import axios from 'axios';

// Variables
const ROOT_URL = 'http://localhost:8090/';

// Export an action creator for import to related component to perform an action
export function fetchSecretData() {

	// return a function that take dispatch as parameter (redux thunk middleware)
	return dispatch => {

		// request to a backend api to get some data
		axios.get(ROOT_URL, { headers: { authorization: localStorage.getItem('token') }})
			.then(response => {
				
				// dispatch is using to pass the object to all of reducers
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

				// Calling the callback after get a response back from the backend
				cb();
			})
			.catch(({response}) => {
				// get error message from the response header
				const errorMsg = response.headers['www-authenticate'];

				// set an error state
				dispatch(authError(errorMsg));
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