import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../client/actions/DocumentsAction';
import * as types from '../../../client/actions/ActionTypes';
import nock from 'nock';
var expect = require('chai').expect;

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

// beforeEach(function() {
//     window.sessionStorage.setItem('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjg5OTgsImlhdCI6MTQ5ODMxNjA2NywiZXhwIjoxNDk4MzE3NTA3fQ.PNFjC5v-hc-vNv4uibxTU0JkXFHm3Hj8dXn-1Eqxd1Q');
// })

// afterEach(() => {
//     sessionStorage.clear();
//     nock.cleanAll()
// })

// describe('dispatch actions', function() {

//     it('should have a type of "LOAD_DOCUMENTBYID_SUCCESS"', function() {
//         expect(actions.loadDocumentByIdSuccess().type).to.eql('LOAD_DOCUMENTBYID_SUCCESS');
//     });

//     it('should have a type of "UPDATED_DOCUMENT_SUCCESS"', function() {
//         expect(actions.updatedDocument().type).to.eql('UPDATED_DOCUMENT_SUCCESS');
//     });

//     it('should have a type of "DELETED_DOCUMENT_SUCCESS"', function() {
//         expect(actions.deletedById().type).to.eql('DELETED_DOCUMENT_SUCCESS');
//     });

//     it('should have a type of "LOAD_DOCUMENTS_SUCCESS"', function() {
//         expect(actions.loadDocumentsSuccess().type).to.eql('LOAD_DOCUMENTS_SUCCESS');
//     });

//     describe('createdDocument', function() {
//         it('should have a type of "CREATED_DOCUMENT_SUCCESS"', function() {
//             expect(actions.createdDocument().type).to.eql('CREATED_DOCUMENT_SUCCESS');
//         });
//         it('should pass on the records  passed in', function() {
//             var records = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }
//             expect(actions.createdDocument(records).records).to.eql(records);
//         });
//     })

//     describe('loadDocumentsSuccess', function() {
//         it('should have a type of "LOAD_DOCUMENTS_SUCCESS"', function() {
//             expect(actions.loadDocumentsSuccess().type).to.eql('LOAD_DOCUMENTS_SUCCESS');
//         });
//         it('should pass on the records  passed in', function() {
//             var docs = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }
//             expect(actions.loadDocumentsSuccess(docs).docs).to.eql(docs);
//         });
//     })

//     describe('loadMyDocumentsSuccess', function() {
//         it('should have a type of "LOADMY_DOCUMENTS_SUCCESS"', function() {
//             expect(actions.loadMyDocumentsSuccess().type).to.eql('LOADMY_DOCUMENTS_SUCCESS');
//         });
//         it('should pass on the records  passed in', function() {
//             var docs = { title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }
//             expect(actions.loadMyDocumentsSuccess(docs).docs).to.eql(docs);
//         });
//     })

// });

// describe('async actions', () => {

//     it('creates LOAD_DOCUMENTS_SUCCESS when fetching documents has been done', () => {
//         nock('http://localhost.com/')
//             .get('/documents')
//             .reply(200, {
//                 body: {
//                     docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }]
//                 }
//             })

//         const expectedActions = [
//             { type: types.LOAD_DOCUMENTS_SUCCESS, response: { docs: [{ id: 1, title: 'Jello Tester', content: 'this world', access: 'public', userId: 2 }] } }
//         ]
//         const store = mockStore({ documents: [] })

//         return store.dispatch(actions.loadDocuments()).then(() => {
//             expect(store.getActions()).to.eql(expectedActions)
//         })
//     })
// })


describe('Actions :: fetchTags', () => {
    it('Fetches tags from the server and returns action', (done) => {
        nock('http://localhost:8181', {
            reqheaders: {
                'x-access-token': 'token'
            }
        })
            .get('/api/tags')
            .reply(200, [{}, {}, {}]);
        actions.looadDocuments()

        fetchTags('token', (action) => {
            (action.type).should.eql(constants.FETCHED_TAGS);
            (action.payload).should.be.an.Array;
            done();
        });
    });
});
