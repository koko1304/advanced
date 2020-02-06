import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = ({auth}) => {
	function toggleSignin() {
		if (auth) {
			return <Link className="btn btn-primary" to="/signout">Sign Out</Link>
		}

		return [
			<Link key="signin" className="btn btn-primary mr-3" to="/signin">Sign In</Link>,
			<Link key="signup" className="btn btn-primary" to="/signup">Sign Up</Link>
		];
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="/">FACEBOOK</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/dashboard">Dashboard</Link>
						</li>
					</ul>
					{toggleSignin()}
				</div>
			</div>  
		</nav>
	);
};

export default connect(({auth}) => ({auth}))(Header);