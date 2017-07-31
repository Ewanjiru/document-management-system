import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function Count(state = initialState.count, action) {
  switch (action.type) {
    case actionTypes.LOAD_COUNT_SUCCESS:
      return {
        count: action.count,
      };
    default:
      return state;
  }
}
export default Count;
