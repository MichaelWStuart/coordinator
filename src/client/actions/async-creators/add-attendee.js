import fetch from 'isomorphic-fetch';
import error from '../sync-creators/error';
import addToExisting from '../sync-creators/attendees/add-to-existing';
import addToNew from '../sync-creators/attendees/add-to-new';

export default data =>
  dispatch =>
    fetch('/venues/add-attendee', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((response) => {
      if (response.error) {
        dispatch(error(response.description));
      } else if (response.type === 'new venue') {
        dispatch(addToNew(response));
      } else {
        dispatch(addToExisting(response));
      }
    });
