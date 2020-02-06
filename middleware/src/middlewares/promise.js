export default ({ dispatch }) => {
	return next => action => {

		// If there is no promise just go to next middleware
		if (!action.payload || !action.payload.then) {
			return next(action);
		}

		// Waiting until promise give us a result and
		// Pass it to all middlewares again
		action.payload.then((result) => {

			// Dispatch using to pass action back to the starting point
			// again because to make sure all middlewares done all it jobs
			// correctly without care about the order of middleware
			dispatch({ ...action, payload: result.data });
		});
	}
}