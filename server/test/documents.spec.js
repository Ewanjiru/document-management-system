const middlewares = require('../helpers/middleware');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const should = chai.should();
let Token = '';
chai.use(chaiHttp);
/*
 * Test the /POST route
 */
const user = {
  email: 'ex@gmail.com',
  password: '1Eunice@',
};

beforeEach((done) => {
  chai.request(app)
    .post('/users/login')
    .send(user)
    .end((err, res) => {
      Token = res.body.Token;
      done();
    });
});

describe('/post endpoint', () => {
  it('it should create a new document', (done) => {
    const docs = {
      title: 'This Test Document',
      content: 'It is good habit to always spend unfortunately it is often underestimated.',
      access: 'public',
      userId: 1
    };
    chai.request(app)
      .post('/documents')
      .set('x-access-token', Token)
      .send(docs)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('doc');
        res.body.doc.should.have.property('title').eql('This Test Document');
        res.body.doc.should.have.property('content').eql('It is good habit to always spend unfortunately it is often underestimated.');
        res.body.doc.should.have.property('access').eql('public');
        res.body.should.have.property('message').eql('Document Created Successfully');
        done();
      });
  });
});
/*
 * Test the /GET route
 */
describe('/get endpoint', () => {
  it('it should retrieve all the documents', (done) => {
    chai.request(app)
      .get('/documents')
      .set('x-access-token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
// /*
//  * Test the /GET by id route
//  */
describe('/get/documents/id endpoint', () => {
  const id = 1;
  it('Should retrieve document just created by the given the id', (done) => {
    chai.request(app)
      .get(`/documents/${id}`)
      .set('x-access-token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title').eql('This Test Document');
        res.body.should.have.property('id').eql(1);
        done();
      });
  });
});
/*
 * Test the get by offset
 */
describe('/get by given offset and limit endpoint', () => {
  const limit = 1;
  const offset = 3;
  it('it should not retrieve any document as there is only one', (done) => {
    chai.request(app)
      .get(`/documents/?limit=${limit}&offset=${offset}`)
      .set('x-access-token', Token)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Documents not found');
        done();
      });
  });

  const limit1 = 1;
  const offset1 = 0;
  it('it should  retrieve the only document there is', (done) => {
    chai.request(app)
      .get(`/documents/?limit=${limit1}&offset=${offset1}`)
      .set('x-access-token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('doc');
        res.body.should.have.property('message').eql('Request Successful');
        done();
      });
  });
});
// /*
//  * Test the update
//  */
describe('/put router', () => {
  it('it should retrieve the fist documents and update their title to Hello World', (done) => {
    chai.request(app)
      .put('/documents/1')
      .set('x-access-token', Token)
      .send({ title: 'Hello World' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Document updated Successfully.');
        res.body.should.have.property('updatedDocument');
        res.body.updatedDocument.should.have.property('title').eql('Hello World');
        done();
      });
  });
});
// /*
//  * Test the /delete route
//  */
describe('/delete/documents/:id ', () => {
  const doc = {
    title: 'This Test Document',
    content: 'It is good habit to always spend some time making tests to assure a server as reliable as possible but unfortunately it is often underestimated.',
    access: 'admin',
    userId: 2,
  };
  let id = null;
  it('it should create a test document', (done) => {
    chai.request(app)
      .post('/documents')
      .set('x-access-token', Token)
      .send(doc)
      .end((err, res) => {
        id = res.body.id;
        done();
      });
  });
  it('it should delete  the test document by the given id', (done) => {
    chai.request(app)
      .delete(`/documents/${id}`)
      .set('x-access-token', Token)
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Document Deleted Successfully');
        done();
      });
  });
});
