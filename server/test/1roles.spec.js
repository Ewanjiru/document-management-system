const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /POST route
 */
describe('/post endpoint', () => {
  it('it should create a new role', (done) => {
    const arole = {
      role: 'admin'
    };
    chai.request(app)
      .post('/roles')
      .send(arole)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        done();
      });
  });

  it('it should retrieve all the roles', (done) => {
    chai.request(app)
      .get('/roles')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(1);
        done();
      });
  });
});

describe('/delete/roles/:id ', () => {
  const arole = {
    role: 'testRole'
  };
  let roleId = null;
  it('it should a test role', (done) => {
    chai.request(app)
      .post('/roles')
      .send(arole)
      .end((err, res) => {
        roleId = res.body.id;
        done();
      });
  });
  it('it should delete a role by the given id', (done) => {
    chai.request(app)
      .delete(`/roles/${roleId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Role Deleted Successfully');
        done();
      });
  });
});
