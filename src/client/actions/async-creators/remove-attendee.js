import fetch from 'isomorphic-fetch';
import removeUser from '../sync-creators/attendees/remove-user';
import removeVenue from '../sync-creators/attendees/remove-venue';

export default data =>
  dispatch =>
    fetch('/venues/remove-attendee', {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then((response) => {
      if (response.type === 'remove venue') {
        dispatch(removeVenue(response));
      } else {
        dispatch(removeUser(response));
      }
    });
