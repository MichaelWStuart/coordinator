import { ADD_ATTENDEE } from '../actions/constants';

const initial = [];

export default (state = initial, action) => {
  switch (action.type) {
    case ADD_ATTENDEE:
      return [...state].concat(action.payload);
    default: {
      return state;
    }
  }
};
