import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/SignUpAction';
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
  it('should have a type of "CREATE_USERS"', () => {
    expect(actions.createdUser().type).to.eql('CREATE_USERS');
  });

  it('should have a type of "LOG_USER"', () => {
    expect(actions.loggedUser().type).to.eql('LOG_USER');
  });

  it('should have a type of "LOGOUT_USER"', () => {
    expect(actions.loggedOutUser().type).to.eql('LOGOUT_USER');
  });
});
