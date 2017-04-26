import { LOGIN } from '../actions/constants';

const initial = { profileId: '', _id: '' };

export default (state = initial, action) => {
  switch (action.type) {
    case LOGIN:
      return { profileId: action.payload.profileId, _id: action.payload._id };
    default: {
      return state;
    }
  }
};
