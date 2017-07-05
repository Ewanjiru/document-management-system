import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/UserAction';
import * as types from '../../../client/actions/ActionTypes';
import localStorageMock from './__mocks__/localStorage';

const expect = require('chai').expect;

window.sessionStorage = localStorageMock;


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

beforeEach(() => {
  window.sessionStorage.setItem('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5OTgsImlhdCI6MTQ5ODMxNjA2NywiZXhwIjoxNDk4MzE3NTA3fQ.PNFjC5v-hc-vNv4uibxTU0JkXFHm3Hj8dXn-1Eqxd1Q');
});

afterEach(() => {
  window.sessionStorage.clear();
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
