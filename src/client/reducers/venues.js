import {
  ADD_TO_NEW,
  ADD_TO_EXISTING,
  REMOVE_VENUE,
  REMOVE_USER,
} from '../actions/constants';

const initial = [];

export default (state = initial, action) => {
  switch (action.type) {
    case ADD_TO_NEW:
      return [...state].concat({ yelpId: action.payload.yelpId, attendees: [action.payload.userId] });
    case ADD_TO_EXISTING:
      return [...state].find(venue => venue.yelpId === action.payload.yelpId).attendees.concat(action.payload.userId);
    case REMOVE_VENUE:
      return [...state].filter(venue => venue.yelpId !== action.payload.yelpId);
    case REMOVE_USER:
      return [...state].find(venue => venue.yelpId === action.payload.yelpId).attendees.filter(id => id !== action.payload.userId);
    default: {
      return state;
    }
  }
};
