import expect from 'expect';
import * as DocumentsActions from '../actions/DocumentsAction';
import DocumentsReducer from '../reducers/DocumentsReducer';
import * as types from '../actions/ActionTypes';

describe('documents reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    expect(DocumentsReducer(undefined, {})).toEqual(initialState);
  });

  it('Should handle LOAD_DOCUMENTS_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const docs = [{ title: 'hello world', content: 'blah blah blah', access: 'public', userId: 1 }];
    const action = DocumentsActions.loadDocumentsSuccess(docs);
    const newState = DocumentsReducer(initialState, action);
    expect(newState)
      .toEqual({
        all: [{ title: 'hello world', content: 'blah blah blah', access: 'public', userId: 1 }],
        byId: {}
      });
  });

  it('Should handle LOAD_DOCUMENTBYID_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const doc = { title: 'world', content: 'blah blah blah', access: 'public', userId: 4 };
    const action = DocumentsActions.loadDocumentByIdSuccess(doc);
    expect(DocumentsReducer(initialState, action))
      .toEqual({
        all: [],
        byId: { title: 'world', content: 'blah blah blah', access: 'public', userId: 4 }
      });
  });

  it('Should handle LOADMY_DOCUMENTS_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const docs = [{ title: 'hello world', content: 'blah blah blah', access: 'public', userId: 1 }, { title: 'hello', content: 'blah blah blah', access: 'public', userId: 1 }];
    const action = DocumentsActions.loadMyDocumentsSuccess(docs);
    expect(DocumentsReducer(initialState, action))
      .toEqual({
        all: [{ title: 'hello world', content: 'blah blah blah', access: 'public', userId: 1 }, { title: 'hello', content: 'blah blah blah', access: 'public', userId: 1 }],
        byId: {}
      });
  });

  it('Should handle LOAD_SEARCHDOCUMENTS_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const docs = [{ title: 'hello world', content: 'blah blah blah', access: 'public', userId: 1 }, { title: 'hello', content: 'blah blah blah', access: 'public', userId: 3 }, { title: 'hell', content: 'blah blah blah', access: 'public', userId: 4 }];
    const action = DocumentsActions.loadSearchedSuccess(docs);
    expect(DocumentsReducer(initialState, action))
      .toEqual({
        all: [{ title: 'hello world', content: 'blah blah blah', access: 'public', userId: 1 }, { title: 'hello', content: 'blah blah blah', access: 'public', userId: 3 }, { title: 'hell', content: 'blah blah blah', access: 'public', userId: 4 }],
        byId: {}
      });
  });

  it('Should handle UPDATED_DOCUMENT_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: { title: 'hello', content: 'blah blah blah', access: 'public', userId: 1 }
    };
    const records = { title: 'updated document', content: 'blah blah blah', access: 'public', userId: 1 };
    const action = { type: types.UPDATED_DOCUMENT_SUCCESS, records };
    expect(DocumentsReducer(initialState, action))
      .toEqual({
        all: [],
        byId: { title: 'updated document', content: 'blah blah blah', access: 'public', userId: 1 }
      });
  });

  it('Should handle CREATED_DOCUMENT_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: {}
    };
    const records = { title: 'created document', content: 'blah blah blah', access: 'public', userId: 1 };
    const action = DocumentsActions.createdDocument(records);
    expect(DocumentsReducer(initialState, action))
      .toEqual({
        all: [],
        byId: { title: 'created document', content: 'blah blah blah', access: 'public', userId: 1 }
      });
  });

  it('Should handle DELETED_DOCUMENT_SUCCESS', () => {
    const initialState = {
      all: [],
      byId: { title: 'created document', content: 'blah blah blah', access: 'public', userId: 1 }
    };
    const response = {};
    const action = DocumentsActions.deletedById(response);
    expect(DocumentsReducer(initialState, action))
      .toEqual({
        all: [],
        byId: {}
      });
  });
});
