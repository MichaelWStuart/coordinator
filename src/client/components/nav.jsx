import React, { PropTypes } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncLogout from '../actions/async-creators/user/logout';

const Nav = props =>
  <nav id="head-box">
    {props.pathname !== '/polls' &&
      <NavLink id="home-link" to={'/home'}>Home</NavLink>}
    {props.user ? (
      <div className="head-link-box">
        <p id="head-current-user">Logged in as {props.user}</p>
        <NavLink className="head-link" onClick={props.handleClick} to={'/home'}>Logout</NavLink>
      </div>
    ) : (
      <div className="head-link-box">
        <NavLink className="head-link" to={'/users/register'}>Sign Up</NavLink>
        <NavLink className="head-link" to={'/auth/login'}>Login</NavLink>
      </div>
    )}
  </nav>;

Nav.propTypes = {
  handleClick: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.username,
});

const mapDispatchToProps = dispatch => ({
  handleClick: () => dispatch(asyncLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
