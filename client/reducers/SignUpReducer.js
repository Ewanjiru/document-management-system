import redux from 'redux';
import SIGN_UP from '../actionCreators/SignUpAction';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      return action.payload.data;
    default:
      return state;
  }
}
