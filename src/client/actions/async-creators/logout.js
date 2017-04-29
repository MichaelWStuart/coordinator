import fetch from 'isomorphic-fetch';
import logout from '../sync-creators/logout';

export default () =>
  dispatch =>
    fetch('/auth/facebook/logout', {
      credentials: 'same-origin',
    })
    .then(() => dispatch(logout()));
