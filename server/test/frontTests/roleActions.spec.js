import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/RoleActions';
import * as types from '../../../client/actions/ActionTypes';

const expect = require('chai').expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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

describe('async create  role action', () => {
  it('invokes CREATED_ROLE_SUCCESS when creating role ', (done) => {
    nock('http://localhost.com')
            .post('/roles')
            .reply(201, {
              body: {
                roles: { role: 'admin' }
              }
            });

    const expectedActions = [
            { type: types.CREATED_ROLE_SUCCESS, response: { role: 'admin' } }
    ];
    const store = mockStore({ roles: [] }, done());
    store.dispatch(actions.newRole()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async load roles action', () => {
  it('invokes LOAD_ROLES_SUCCESS when loading roles ', (done) => {
    nock('http://localhost.com')
            .get('/roles')
            .reply(200, {
              body: {
                roles: { role: 'admin' }
              }
            });

    const expectedActions = [
            { type: types.LOAD_ROLES_SUCCESS, response: { role: 'admin' } }
    ];
    const store = mockStore({ roles: [] }, done());
    store.dispatch(actions.loadRoles()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async delete roles action', () => {
  it('invokes DELETED_ROLE_SUCCESS when deleting roles ', (done) => {
    nock('http://localhost.com')
            .delete('/roles/1')
            .reply(200, {
              body: {
                roles: { role: 'admin' }
              }
            });

    const expectedActions = [
            { type: types.DELETED_ROLE_SUCCESS, response: { message: 'Role Deleted Successfully' } }
    ];
    const store = mockStore({ roles: [] }, done());
    store.dispatch(actions.deleteRole()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});
