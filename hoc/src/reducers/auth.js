export default (state = false, { type, payload }) => {

	if (type === 'AUTH_HANDLER') {
		return payload;
	}

	return state;
}