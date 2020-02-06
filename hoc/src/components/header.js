// Frameworks
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// Action Creators
import { authHandler } from '../actions';

const Header = ({ authHandler, auth }) => {
	function handleAuth() {
		auth ? authHandler(false) : authHandler(true);
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" to="/"><i className="fab fa-themeisle"></i> MOMO</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/resources">Resources 1</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/resources2">Resources 2</Link>
						</li>
					</ul>
					<button onClick={handleAuth} className="btn btn-primary btn-sm">{auth ? 'Sign Out' : 'Sign In'} <i className={`fas fa-sign-${auth ? 'out' : 'in'}-alt ml-1`}></i></button>
				</div>
			</div>
		</nav>
	);
};

export default connect(({auth}) => ({auth}), { authHandler })(Header);