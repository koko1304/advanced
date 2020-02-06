// Frameworks
import React from 'react';

// Components
import Header from './header';

// Higher Order Components
import requireAuth from '../hocs/require-auth';

const Resources2 = () => {
	return (
		<div>
			<Header />
			<div className="container py-5">
				<h1>Resources Page 2</h1>
			</div>
		</div>
	);
};

export default requireAuth(Resources2);