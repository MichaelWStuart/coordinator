import { LOGIN, LOGOUT } from '../actions/constants';

const initial = { username: '', _id: '' };

export default (state = initial, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.payload.username, _id: action.payload._id };
    case LOGOUT:
      return initial;
    default: {
      return state;
    }
  }
};
