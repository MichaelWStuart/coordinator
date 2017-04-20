import fetch from 'isomorphic-fetch';
import logout from '../../sync-creators/user/logout';

export default () =>
  dispatch =>
    fetch('/auth/logout', {
      method: 'POST',
      credentials: 'same-origin',
    })
    .then(() => dispatch(logout()));
