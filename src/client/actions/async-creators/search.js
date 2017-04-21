import fetch from 'isomorphic-fetch';
import search from '../sync-creators/search';

export default () =>
  dispatch => {
    fetch('/search', {
      method: 'POST',
    })
    .then(res => res.json())
    .then(response => dispatch(search(response)));
  }
