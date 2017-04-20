import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import register from '../actions/async-creators/user/register';
import error from '../actions/sync-creators/error';

class Register extends React.Component {

  componentWillUnmount() {
    this.props.dispatchError('');
  }

  validateFormData(event, props) {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    if (username.match(/[^\w-\/ ]+/g)) {
      return props.dispatchError('Username may only contain letters, numbers, underscores and hyphens.');
    }
    if ((username.length < 4) || (username.length > 20)) {
      return props.dispatchError('Username must be between 4 and 20 characters long.');
    }
    if (password.length < 6) {
      return props.dispatchError('Password must be at least 6 characters long.');
    }
    props.dispatchRegister(username, password);
  }

  render() {
    return (
      <div className="user-auth-page">
        {this.props.error &&
          <p className="flash-error-box">{this.props.error}</p>}
        <h1 className="user-auth-title">Register</h1>
        <form onSubmit={event => this.validateFormData(event, this.props)}>
          <input className="user-auth-input" type="text" placeholder="username" name="username" />
          <input className="user-auth-input" type="password" placeholder="password" name="password" />
          <input className="user-auth-button standard-button" type="submit" />
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  dispatchRegister: PropTypes.func.isRequired,
  dispatchError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  dispatchRegister: (username, password) => dispatch(register({ username, password })),
  dispatchError: message => dispatch(error(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
