import React, { PropTypes } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './components/nav';
import Login from './components/login';
import Register from './components/register';
import NotFound from './components/not-found';
import Search from './components/search';

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    const userJustLoggedIn = !!(this.props.user !== nextProps.user);
    if (userJustLoggedIn) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div>
        <Nav pathname={this.props.history.location.pathname} />
        <Switch>
          <Route path={'/auth/login'} component={Login} />
          <Route path={'/users/register'} component={Register} />
          <Route path={'/search'} component={Search} />
          <Redirect from={'/'} to={'/search'} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.username,
});

export default withRouter(connect(mapStateToProps)(App));
