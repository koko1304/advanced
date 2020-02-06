export default (state = {}, { type, payload }) => {

	// check for correct type of action
	if (type === 'FETCH_SECRET_DATA') {

		// Don't ever change state directly (return state = payload Noooooo!!!)
		// Always return new state
		return payload;
	}

	// always return state
	return state;
}