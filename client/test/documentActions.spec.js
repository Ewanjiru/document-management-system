import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../actions/DocumentsAction';
import * as types from '../actions/ActionTypes';
// import localStorageMock from './__mocks__/localStorage';

const expect = require('chai').expect;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => {
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

  it('should have a type of "LOAD_COUNT_SUCCESS" ', () => {
    expect(actions.getCountSuccess().type).to.eql('LOAD_COUNT_SUCCESS');
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

describe('async get all public documents action', () => {
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
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.loadDocuments()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async create document action', () => {
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
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.newDocument()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async get document count action', () => {
  it('invokes LOAD_COUNT_SUCCESS when getting documents count ', (done) => {
    nock('http://localhost.com')
      .get('/count/documents')
      .reply(200, {
        body: {
          docs: { count: 1 }
        }
      });

    const expectedActions = [
      { type: types.LOAD_COUNT_SUCCESS, response: { docs: { count: 1 } } }
    ];
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.countDocuments()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async load my documents action', () => {
  it('invokes LOADMY_DOCUMENTS_SUCCESS when fetching my documents has been done', (done) => {
    nock('http://localhost.com')
      .get('/count/users/2/documents/')
      .reply(200, {
        body: {
          docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }]
        }
      });

    const expectedActions = [
      { type: types.LOADMY_DOCUMENTS_SUCCESS, response: { docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }] } }
    ];
    const store = mockStore({ documents: [] }, done());
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZVR5cGUiOiJ1c2VyIiwiaWF0IjoxNDk5Mjk3ODYwLCJleHAiOjE0OTkzMjM2MDB9.vYxyWmgC7HiKqPt7ineRn-J5UcIEa7sBJNffNbXfGjw';
    store.dispatch(actions.loadMyDocuments(token)).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async load role documents action', () => {
  it('invokes LOADMY_DOCUMENTS_SUCCESS when fetching role documents has been done', (done) => {
    nock('http://localhost.com')
      .get('/role/documents/admin')
      .reply(200, {
        body: {
          docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }]
        }
      });

    const expectedActions = [
      { type: types.LOADMY_DOCUMENTS_SUCCESS, response: { docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }] } }
    ];
    const store = mockStore({ documents: [] }, done());
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZVR5cGUiOiJ1c2VyIiwiaWF0IjoxNDk5Mjk3ODYwLCJleHAiOjE0OTkzMjM2MDB9.vYxyWmgC7HiKqPt7ineRn-J5UcIEa7sBJNffNbXfGjw';
    store.dispatch(actions.loadRoleDocuments(token)).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async view document action', () => {
  it('invokes LOAD_DOCUMENTBYID_SUCCESS when fetching document has been done', (done) => {
    nock('http://localhost.com')
      .get('/documents/1')
      .reply(200, {
        body: {
          doc: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }]
        }
      });

    const expectedActions = [
      { type: types.LOAD_DOCUMENTBYID_SUCCESS, response: { doc: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }] } }
    ];
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.viewDocument(1)).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async get document by id action', () => {
  it('invokes LOAD_DOCUMENTBYID_SUCCESS when fetching  document by id has been done', (done) => {
    nock('http://localhost.com')
      .get('/documents/1')
      .reply(200, {
        body: {
          doc: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }]
        }
      });

    const expectedActions = [
      { type: types.LOAD_DOCUMENTBYID_SUCCESS, response: { doc: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }] } }
    ];
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.viewDocument(1)).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async search action', () => {
  it('invokes LOAD_SEARCHDOCUMENTS_SUCCESS when fetching searching documents has been done', (done) => {
    nock('http://localhost.com')
      .get('/search/documents/?q=ester')
      .reply(200, {
        body: {
          doc: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }]
        }
      });

    const expectedActions = [
      { type: types.LOAD_SEARCHDOCUMENTS_SUCCESS, response: { doc: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'admin', userId: 1 }] } }
    ];
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.searchDocument('ester')).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async edit document action', () => {
  it('invokes UPDATED_DOCUMENT_SUCCESS when editing  document ', (done) => {
    nock('http://localhost.com')
      .put('/documents/1')
      .reply(200, {
        body: {
          docs: [{ id: 1, title: 'Yellow Seater', content: 'this world', access: 'public', userId: 2 }]
        }
      });

    const expectedActions = [
      { type: types.UPDATED_DOCUMENT_SUCCESS, response: { docs: [{ id: 1, title: 'Yellow Seater', content: 'this world', access: 'public', userId: 2 }] } }
    ];
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.editDocument()).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});

describe('async delete document action', () => {
  it('invokes DELETED_DOCUMENT_SUCCESS when deleting  document ', (done) => {
    nock('http://localhost.com')
      .delete('/documents/1')
      .reply(200, {
        body: {
          docs: [{ id: 1, title: 'Yellow Seater', content: 'this world', access: 'public', userId: 2 }]
        }
      });

    const expectedActions = [
      { type: types.DELETED_DOCUMENT_SUCCESS, response: { message: 'Document Deleted Successfully' } }
    ];
    const store = mockStore({ documents: [] }, done());
    store.dispatch(actions.deleteDocument(1)).then(() => {
      expect(store.getActions()).to.equal(expectedActions);
      done();
    });
  });
});
