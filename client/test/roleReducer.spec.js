import expect from 'expect';
import * as RoleActions from '../actions/RoleActions';
import RoleReducers from '../reducers/RoleReducers';
import * as types from '../actions/ActionTypes';

describe('roles reducer', () => {
  it('should return initial state', () => {
    const initialState = [];

    expect(RoleReducers(undefined, {})).toEqual(initialState);
  });

  it('Should handle CREATED_ROLE_SUCCESS', () => {
    const initialState = [];

    const roles = [{ role: 'admin' }];
    const action = RoleActions.createdRole(roles);
    const newState = RoleReducers(initialState, action);
    expect(newState)
      .toEqual({
        roles: [{ role: 'admin' }]
      });
  });

  it('Should handle LOAD_ROLES_SUCCESS', () => {
    const initialState = [];

    const roles = [{ role: 'admin' }];
    const action = RoleActions.loadRolesSuccess(roles);
    const newState = RoleReducers(initialState, action);
    expect(newState)
      .toEqual(
      [{ role: 'admin' }]
      );
  });

  it('Should handle DELETED_ROLE_SUCCESS', () => {
    //const initialState = [{ role: 'admin' }];
    const roles = [];
    const action = RoleActions.deletedRoleById(roles);
    const newState = RoleReducers([], action);
    console.log('therese ', newState);
    expect(newState)
      .toEqual([]);
  });
});
