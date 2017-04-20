import fetch from 'isomorphic-fetch';
import login from '../../sync-creators/user/login';
import error from '../../sync-creators/error';

export default data =>
  dispatch =>
    fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((response) => {
      if (response.success) {
        dispatch(login(response.credentials));
        dispatch(error(''));
      } else {
        dispatch(error(response.message));
      }
    });
