import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/RoleActions';
import * as types from '../../../client/actions/ActionTypes';

const expect = require('chai').expect;

afterEach(() => {
  nock.cleanAll();
});

describe('dispatch actions', () => {
  describe('createdRole', () => {
    it('should have a type of "CREATED_ROLE_SUCCESS"', () => {
      expect(actions.createdRole().type).to.eql('CREATED_ROLE_SUCCESS');
    });
    it('should create new role', () => {
      const records = { role: 'admin' };
      expect(actions.createdRole(records).records).to.eql(records);
    });
  });

  describe('loadRolesSuccess', () => {
    it('should have a type of "LOAD_ROLES_SUCCESS"', () => {
      expect(actions.loadRolesSuccess().type).to.eql('LOAD_ROLES_SUCCESS');
    });
    it('should retrieve passed role', () => {
      const roles = { role: 'admin' };
      expect(actions.loadRolesSuccess(roles).roles).to.eql(roles);
    });
  });
});
