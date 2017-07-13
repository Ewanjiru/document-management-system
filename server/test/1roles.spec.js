const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');

const should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /POST route
 */

describe('POST /roles', () => {
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
});

describe('/delete/roles/:id ', () => {
  const arole = {
    role: 'testRole'
  };
  let roleId = null;
  it('it should add a test role', (done) => {
    chai.request(app)
      .post('/roles')
      .send(arole)
      .end((err, res) => {
        roleId = res.body.arole.id;
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
  }).timeout(10000);
});

describe('/delete/roles/:id ', () => {
  const roleId = 60;
  it('it should delete a role by the given id', (done) => {
    chai.request(app)
      .delete(`/roles/${roleId}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Role Not Found');
        done();
      });
  }).timeout(10000);
});
