import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions/UserAction';
import * as types from '../actions/ActionTypes';

const expect = require('chai').expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
  nock.cleanAll();
});

describe('dispatch actions', () => {
  it('should have a type of "LOAD_USERS_SUCCESS"', () => {
    expect(actions.loadUsersSuccess().type).to.eql('LOAD_USERS_SUCCESS');
  });

  it('should have a type of "SEARCH_USERS_SUCCESS"', () => {
    expect(actions.UserSearchedSuccess().type).to.eql('SEARCH_USERS_SUCCESS');
  });

  it('should have a type of "LOAD_COUNT_SUCCESS"', () => {
    expect(actions.getCountSuccess().type).to.eql('LOAD_COUNT_SUCCESS');
  });

  it('should have a type of "LOAD_USERBYID_SUCCESS"', () => {
    expect(actions.loadUserByIdSuccess().type).to.eql('LOAD_USERBYID_SUCCESS');
  });

  describe('updatedUser', () => {
    it('should have a type of "UPDATED_USER_SUCCESS"', () => {
      expect(actions.updatedUser().type).to.eql('UPDATED_USER_SUCCESS');
    });
    it('should pass on the records  passed in', () => {
      const response = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 };
      expect(actions.updatedUser(response).response).to.eql(response);
    });
  });

  describe('deletedUserById', () => {
    it('should have a type of "DELETED_USER_SUCCESS"', () => {
      expect(actions.deletedUserById().type).to.eql('DELETED_USER_SUCCESS');
    });
    it('should pass on the records  passed in', () => {
      const response = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 };
      expect(actions.deletedUserById(response).response).to.eql(response);
    });
  });
});

describe('async load  users action', () => {
  it('invokes LOAD_USERS_SUCCESS when creating new user ', (done) => {
    nock('http://localhost.com')
      .post('/users')
      .reply(200, {
        body: {
          users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }]
        }
      });

    const expectedActions = [
      { type: types.LOAD_USERS_SUCCESS, response: { users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }] } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.loadUsers()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async search  users action', () => {
  it('invokes SEARCH_USERS_SUCCESS when searching new user ', (done) => {
    nock('http://localhost.com')
      .post('/search/users/?q=nice')
      .reply(200, {
        body: {
          users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }]
        }
      });

    const expectedActions = [
      { type: types.SEARCH_USERS_SUCCESS, response: { users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }] } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.searchUser('nice')).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async view  user action', () => {
  it('invokes LOAD_USERBYID_SUCCESS when searching new user ', (done) => {
    nock('http://localhost.com')
      .post('/users/1')
      .reply(200, {
        body: {
          users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }]
        }
      });

    const expectedActions = [
      { type: types.LOAD_USERBYID_SUCCESS, response: { users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }] } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.viewUser(1)).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async count  user action', () => {
  it('invokes LOAD_COUNT_SUCCESS when searching new user ', (done) => {
    nock('http://localhost.com')
      .get('/count/users')
      .reply(200, {
        body: {
          users: { count: 1 }
        }
      });

    const expectedActions = [
      { type: types.LOAD_COUNT_SUCCESS, response: { users: { count: 1 } } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.countUsers()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async edit  user action', () => {
  it('invokes UPDATED_USER_SUCCESS when searching new user ', (done) => {
    nock('http://localhost.com')
      .put('/users/1')
      .reply(200, {
        body: {
          users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }]
        }
      });

    const expectedActions = [
      { type: types.UPDATED_USER_SUCCESS, response: { users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }] } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.editUser()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async delete  user action', () => {
  it('invokes DELETED_USER_SUCCESS when deleting  user ', (done) => {
    nock('http://localhost.com')
      .delete('/users/1')
      .reply(200, {
        body: {
          users: [{ firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }]
        }
      });

    const expectedActions = [
      { type: types.DELETED_USER_SUCCESS, response: { message: 'user Deleted Successfully' } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.deleteUser()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

