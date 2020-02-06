export default (state = {}, { type, payload }) => {

	if (type === 'FETCH_SECRET_DATA') {
		return payload;
	}

	return state;
}