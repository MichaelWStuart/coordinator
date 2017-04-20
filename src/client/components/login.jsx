import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import login from '../actions/async-creators/user/login';
import error from '../actions/sync-creators/error';

class Login extends React.Component {

  componentWillUnmount() {
    this.props.clearError();
  }

  render() {
    return (
      <div className="user-auth-page">
        {this.props.error &&
          <p className="flash-error-box">{this.props.error}</p>}
        <h1 className="user-auth-title">Login</h1>
        <form onSubmit={this.props.handleClick}>
          <input className="user-auth-input" type="text" placeholder="username" name="username" />
          <input className="user-auth-input" type="password" placeholder="password" name="password" />
          <input className="user-auth-button standard-button" type="submit" />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleClick: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (event) => {
    event.preventDefault();
    dispatch(login(
      {
        username: event.target.elements.username.value,
        password: event.target.elements.password.value,
      },
    ));
  },
  clearError: () => dispatch(error('')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
