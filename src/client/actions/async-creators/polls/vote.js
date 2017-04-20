import fetch from 'isomorphic-fetch';
import error from '../../sync-creators/error';
import edit from '../../sync-creators/polls/edit';

export default (poll, optionId, voterId) =>
  dispatch =>
    fetch(`/polls/${poll._id}/vote`, {
      method: 'PUT',
      body: JSON.stringify({ optionId, voterId }),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((response) => {
      if (response.success) {
        dispatch(edit(response.resPoll));
        dispatch(error(''));
      } else {
        dispatch(error(response.message));
      }
    });
