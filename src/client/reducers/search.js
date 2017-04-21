import { SEARCH } from '../actions/constants';

const initial = {};

export default (state = initial, action) => {
  switch (action.type) {
    case SEARCH:
      return Object.assign({}, action.payload);
    default: {
      return state;
    }
  }
};
