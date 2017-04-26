import fetch from 'isomorphic-fetch';
import search from '../sync-creators/search';
import error from '../sync-creators/error';

export default location =>
  dispatch =>
    fetch(`/venues/search/${location}`, {
      method: 'POST',
    })
    .then(res => res.json())
    .then((response) => {
      if (response.error) {
        dispatch(error(response.error.description));
      } else {
        dispatch(error(''));
        dispatch(search(response));
      }
    });
