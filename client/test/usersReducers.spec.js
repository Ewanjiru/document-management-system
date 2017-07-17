import expect from 'expect';
import UsersReducer from '../reducers/UsersReducer';
import * as actions from '../actions/UserAction';
import * as types from '../actions/ActionTypes';

describe('documents reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    expect(UsersReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle LOAD_USERS_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const users = [{ firstName: 'Eunice', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }];
    const action = actions.loadUsersSuccess(users);
    expect(UsersReducer(initialState, action))
      .toEqual({
        all: [{ firstName: 'Eunice', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }],
        byId: {}
      });
  });

  it('Should handle LOAD_USERBYID_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const user = { firstName: 'Eunice', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' };
    const action = { type: types.LOAD_USERBYID_SUCCESS, user };
    expect(UsersReducer(initialState, action))
      .toEqual({
        all: [],
        byId: { firstName: 'Eunice', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }
      });
  });

  it('Should handle SEARCH_USERS_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const users = [{ firstName: 'Eun', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }, { firstName: 'Eunic', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }, { firstName: 'Euni', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }];
    const action = { type: types.SEARCH_USERS_SUCCESS, users };
    expect(UsersReducer(initialState, action))
      .toEqual({
        all: [{ firstName: 'Eun', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }, { firstName: 'Eunic', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }, { firstName: 'Euni', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }],
        byId: {}
      });
  });

  it('Should handle UPDATED_USER_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: { firstName: 'Eun', lastName: 'Wanjiru', email: 'e@gmail.com', roleType: 'admin' }
    };
    const records = { firstName: 'Eunicey', lastName: 'Wanjiru', email: 'eunicey@gmail.com', roleType: 'admin' };
    const action = { type: types.UPDATED_USER_SUCCESS, records };
    expect(UsersReducer(initialState, action))
      .toEqual({
        all: [],
        byId: { firstName: 'Eunicey', lastName: 'Wanjiru', email: 'eunicey@gmail.com', roleType: 'admin' }
      });
  });

  it('Should handle DELETED_USER_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: { title: 'created document', content: 'blah blah blah', access: 'public', userId: 1 }
    };
    const response = {};
    const action = { type: types.DELETED_USER_SUCCESS, response };
    expect(UsersReducer(initialState, action))
      .toEqual({
        all: [],
        byId: {}
      });
  });
});
