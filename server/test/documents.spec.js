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

describe('DOCUMENT TESTS', () => {
  beforeEach((done) => {
    chai.request(app)
      .post('/users/login')
      .send(user)
      .end((err, res) => {
        Token = res.body.Token;
        done();
      });
  });
  /*
   * Test the /post route to pass
   */
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
   * Test the /post route to fail as fields are empty
   */
  describe('/post endpoint', () => {
    it('it should fail as fields are empty', (done) => {
      const docs = {
        title: '',
        content: '',
        access: '',
        userId: 1
      };
      chai.request(app)
        .post('/documents')
        .set('x-access-token', Token)
        .send(docs)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: Fill all fields');
          done();
        });
    });
  });
  /*
   * Test the /post route to fail.
   */
  describe('/post endpoint', () => {
    it('it should throw error when creating document with duplicated title', (done) => {
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
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: That title already exists');
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
  /*
  * Test the /GET by id route
  */
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
  * Test the /GET by id  of unexisting document route
  */
  describe('/get/documents/id endpoint', () => {
    const id = 67;
    it('Should fail as  document does not exist', (done) => {
      chai.request(app)
        .get(`/documents/${id}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: Document Not Found');
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
          res.body.should.have.property('message').eql('Error: There are no existing documents');
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
  /*
  * Test the update
  */
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
          done();
        });
    });
  });

  /*
  * Test the update unexisting document
  */
  describe('/put router', () => {
    it('it should fail as document does not exist', (done) => {
      chai.request(app)
        .put('/documents/90')
        .set('x-access-token', Token)
        .send({ title: 'Nancy' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: Document Not Found');
          done();
        });
    });
  });

  /*
  * test document search not existing
  */
  describe('/search/documents/ endpoint', () => {
    const search = 'funny';
    it('Should search documents', (done) => {
      chai.request(app)
        .get(`/search/documents/?q=${search}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Error: No Document found');
          done();
        });
    });
  });

  /*
* test document search existing
*/
  describe('/search/documents/ endpoint', () => {
    const doc = {
      title: 'Search This Document',
      content: 'It is good habit to always spend some time making tests to assure a server as reliable as possible but unfortunately it is often underestimated.',
      access: 'public',
      userId: 1,
    };
    it('it should create a test document', (done) => {
      chai.request(app)
        .post('/documents')
        .set('x-access-token', Token)
        .send(doc)
        .end((err, res) => {
          done();
        });
    });
    const search = 'Document';
    it('Should search documents', (done) => {
      chai.request(app)
        .get(`/search/documents/?q=${search}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(1);
          done();
        });
    });
  });

  /*
  * Test the /count route
  */
  describe('/count/ endpoint', () => {
    it('it should retrieve count of all the documents', (done) => {
      chai.request(app)
        .get('/count/documents')
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('doc');
          res.body.doc.should.have.property('count').eql(2);
          done();
        });
    });
  });

  /*
  * Test the /delete route
  */
  describe('/delete/documents/:id ', () => {
    const doc = {
      title: 'This Test Document',
      content: 'It is good habit to always spend some time making tests to assure a server as reliable as possible but unfortunately it is often underestimated.',
      access: 'admin',
      userId: 1,
    };
    let access = '';
    it('it should create a test document', (done) => {
      chai.request(app)
        .post('/documents')
        .set('x-access-token', Token)
        .send(doc)
        .end((err, res) => {
          access = res.body.doc.access;
          done();
        });
    });
    it('it should get  the test document by the given role', (done) => {
      chai.request(app)
        .get(`/role/documents/${access}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('docs');
          done();
        });
    });
  });
  /*
  * Test the /delete route
  */
  describe('/delete/documents/:id ', () => {
    const doc = {
      title: 'This Test Document',
      content: 'It is good habit to always spend some time making tests to assure a server as reliable as possible but unfortunately it is often underestimated.',
      access: 'public',
      userId: 1,
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
        .delete('/documents/1')
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Document Deleted Successfully');
          done();
        });
    });
  });
});
