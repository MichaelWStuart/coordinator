import { LOGOUT } from '../actions/constants';

const initial = { profileId: '', _id: '' };

export default (state = initial, action) => {
  switch (action.type) {
    case LOGOUT:
      return initial;
    default: {
      return state;
    }
  }
};
