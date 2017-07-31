import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions/SignUpAction';
import * as types from '../actions/ActionTypes';

const expect = require('chai').expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
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

describe('async create  account action', () => {
  it('invokes CREATE_USERS when creating role ', (done) => {
    nock('http://localhost.com')
      .post('/users')
      .reply(201, {
        body: {
          user: { firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' }
        }
      });

    const expectedActions = [
      { type: types.CREATE_USERS, response: { user: { firstName: 'Eunice', lastName: 'Jeester', email: 'j@gmail.com', password: 'Public@1234', roleType: 'admin' } } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.SignUpAction()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async login  action', () => {
  it('invokes LOG_USER when creating role ', (done) => {
    nock('http://localhost.com')
      .post('/users/login')
      .reply(200, {
        body: {
          message: 'Loggin Successful.',
          Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZVR5cGUiOiJ1c2VyIiwiaWF0IjoxNDk5MzMwOTk4LCJleHAiOjE0OTkzNTY3Mzh9.1R9DxhLA_mxjjuD4QB6HRNFQ3PhLywh7wJkhWLHSpPg',
        }
      });

    const expectedActions = [
      { type: types.LOG_USER, response: { message: 'Loggin Successful.', Token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZVR5cGUiOiJ1c2VyIiwiaWF0IjoxNDk5MzMwOTk4LCJleHAiOjE0OTkzNTY3Mzh9.1R9DxhLA_mxjjuD4QB6HRNFQ3PhLywh7wJkhWLHSpPg' } }
    ];
    const store = mockStore({ users: [] }, done());
    store.dispatch(actions.LoginAction()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});
