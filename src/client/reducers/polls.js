import { CREATE_POLL, EDIT_POLL, DESTROY_POLL } from '../actions/constants';

const initial = [];

export default (state = initial, action) => {
  switch (action.type) {
    case CREATE_POLL:
      return [...state].concat(action.payload);
    case EDIT_POLL: {
      const newState = [...state];
      Object.assign(newState.find(poll => poll._id === action.payload._id), action.payload);
      return newState;
    }
    case DESTROY_POLL:
      return [...state].filter(poll => poll._id !== action.payload);
    default: {
      return state;
    }
  }
};
