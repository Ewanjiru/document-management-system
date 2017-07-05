import * as actionTypes from '../actions/ActionTypes';
import initialState from './InitialState';

function Search(state = initialState.search, action) {
  console.log('reduce search', action);
  switch (action.type) {
    case actionTypes.LOAD_SEARCH_SUCCESS:
      return {
        count: action.search,
      };
    default:
      return state;
  }
}
export default Search;
