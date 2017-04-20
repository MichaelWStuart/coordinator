import { ERROR } from '../actions/constants';

const initial = '';

export default (state = initial, action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;
    default: {
      return state;
    }
  }
};
