import _ from 'lodash';

export default (state = {}, {type, payload}) => {	
	if (type === 'FETCH_USERS') {
		const newUsers = _.mapKeys(payload, 'id');
		return { ...state, ...newUsers };
	}

	return state;
}