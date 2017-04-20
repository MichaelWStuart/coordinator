import fetch from 'isomorphic-fetch';
import create from '../../sync-creators/polls/create';

export default data =>
  dispatch =>
    fetch('/polls/new', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(resPoll => dispatch(create(resPoll)));
