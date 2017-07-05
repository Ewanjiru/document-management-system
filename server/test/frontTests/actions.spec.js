import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../../client/actions/DocumentsAction';
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
  it('should have a type of "LOAD_DOCUMENTBYID_SUCCESS"', () => {
    expect(actions.loadDocumentByIdSuccess().type).to.eql('LOAD_DOCUMENTBYID_SUCCESS');
  });

  it('should have a type of "UPDATED_DOCUMENT_SUCCESS"', () => {
    expect(actions.updatedDocument().type).to.eql('UPDATED_DOCUMENT_SUCCESS');
  });

  it('should have a type of "DELETED_DOCUMENT_SUCCESS"', () => {
    expect(actions.deletedById().type).to.eql('DELETED_DOCUMENT_SUCCESS');
  });

  it('should have a type of "LOAD_DOCUMENTS_SUCCESS"', () => {
    expect(actions.loadDocumentsSuccess().type).to.eql('LOAD_DOCUMENTS_SUCCESS');
  });

  describe('createdDocument', () => {
    it('should have a type of "CREATED_DOCUMENT_SUCCESS"', () => {
      expect(actions.createdDocument().type).to.eql('CREATED_DOCUMENT_SUCCESS');
    });
    it('should pass on the records  passed in', () => {
      const records = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 };
      expect(actions.createdDocument(records).records).to.eql(records);
    });
  });

  describe('loadDocumentsSuccess', () => {
    it('should have a type of "LOAD_DOCUMENTS_SUCCESS"', () => {
      expect(actions.loadDocumentsSuccess().type).to.eql('LOAD_DOCUMENTS_SUCCESS');
    });
    it('should pass on the records  passed in', () => {
      const docs = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 };
      expect(actions.loadDocumentsSuccess(docs).docs).to.eql(docs);
    });
  });

  describe('loadMyDocumentsSuccess', () => {
    it('should have a type of "LOADMY_DOCUMENTS_SUCCESS"', () => {
      expect(actions.loadMyDocumentsSuccess().type).to.eql('LOADMY_DOCUMENTS_SUCCESS');
    });
    it('should pass on the records  passed in', () => {
      const docs = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 };
      expect(actions.loadMyDocumentsSuccess(docs).docs).to.eql(docs);
    });
  });
});

describe('async actions', () => {
  it('invokes LOAD_DOCUMENTS_SUCCESS when fetching documents has been done', (done) => {
    nock('http://localhost.com')
            .get('/documents')
            .reply(200, {
              body: {
                docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }]
              }
            });

    const expectedActions = [
            { type: types.LOAD_DOCUMENTS_SUCCESS, response: { docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }] } }
    ];
    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(actions.loadDocuments()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async actions', () => {
  it('invokes CREATED_DOCUMENT_SUCCESS when creating new document ', (done) => {
    nock('http://localhost.com')
            .post('/documents')
            .reply(200, {
              body: {
                docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }]
              }
            });

    const expectedActions = [
            { type: types.CREATED_DOCUMENT_SUCCESS, response: { docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }] } }
    ];
    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(actions.newDocument()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async actions', () => {
  it('invokes LOAD_COUNT_SUCCESS when getting documents count ', (done) => {
    nock('http://localhost.com')
            .get('/documents')
            .reply(200, {
              body: {
                docs: { count: 1 }
              }
            });

    const expectedActions = [
            { type: types.CREATED_DOCUMENT_SUCCESS, response: { docs: { count: 1 } } }
    ];
    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(actions.countDocuments()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

