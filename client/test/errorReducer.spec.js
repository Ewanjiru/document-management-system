import expect from 'expect';
import * as DocumentsActions from '../actions/DocumentsAction';
import ErrorReducer from '../reducers/ErrorReducer';

describe('error reducer', () => {
  it('should return initial state', () => {
    const initialState = null;
    expect(ErrorReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle ERROR_MESSAGE', () => {
    const initialState = null;
    const message = 'successfully created';
    const action = DocumentsActions.getError(message);
    const newState = ErrorReducer(initialState, action);
    expect(newState)
      .toEqual({
        error: 'successfully created'
      });
  });
});
