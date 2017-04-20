import fetch from 'isomorphic-fetch';
import edit from '../../sync-creators/polls/edit';

export default (poll, history) =>
  dispatch =>
    fetch(`/polls/${poll._id}`, {
      method: 'PUT',
      body: JSON.stringify(poll._options),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(resPoll => dispatch(edit(resPoll)))
    .then(() => history.push(`/polls/${poll._id}`));
