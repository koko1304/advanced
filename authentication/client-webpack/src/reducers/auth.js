export default (state = false, { type, payload }) => {

	// check for correct type of action
	if (type === 'AUTH') {

		// Don't ever change state directly (return state = payload Noooooo!!!)
		// Always return new state
		return payload;
	}

	// always return state
	return state;
}