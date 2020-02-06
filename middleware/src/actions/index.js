// Frameworks
import axios from 'axios';

// Variables
const URL = 'https://jsonplaceholder.typicode.com/users';

export function fetchUsers() {
	const request = axios.get(URL);

	return {
		type: 'FETCH_USERS',
		payload: request
	}
}