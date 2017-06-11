let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /POST route
 */
  describe('/post endpoint', () => {
    it('it should create a new user', (done) => {
      let user={
        firstName: 'Niccie',
        lastName: 'Sheero',
        email: 'ex.ex.com',
        password:'123',
        roleId:1
      }
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Created Successfully');
          done();
        });
    });
  });
/*
 * Test the /GET route
 */
  describe('/get endpoint', () => {
    it('it should retrieve all the users', (done) => {
        chai.request(app)
        .get('/users')
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
  describe('/get/users/id endpoint', () => {
    let user={
      firstName: 'Niccie',
      lastName: 'Sheero',
      email: 'exe.gmail.com',
      password:'123',
      roleId:1
    }
    let id = null
    it('it should create a test user', (done) => {
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          id = res.body.id
          done();
      });
    });
    
    it('Should retrieve user just created by the given the id',(done)=> {
      chai.request(app)
      .get('/users/'+id)
      .end((err,res)=>{
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('roleId');
        done();
      })
    });
  });
/*
 * Test the get by offset
 */
  describe('/get by given offset and limit endpoint', () => {
    let limit = 1;
    let offset = 1;
    it('it should retrieve the second user id 2', (done) => {
        chai.request(app)
        .get('/limit/users/?limit='+limit+'&offset='+offset)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
          done();
        });
      });
  });
/*
 * Test the update 
 */
  describe('/put router',()=>{
    it('it should retrieve the fist user and update their name to Nancy', (done) => {
        chai.request(app)
        .put('/users/1')
        .send({firstName:'Nancy'})
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('user updated Successfully.');
          done();
        });
      });

  });
/*
 * Test the /delete route
 */
  describe('/delete/users/:id ', () => {
    let user={
      firstName: 'Niccie',
      lastName: 'Sheero',
      email: 'exes.gmail.com',
      password:'123',
      roleId:1
    }
    let id = null
    it('it should create a test user', (done) => {
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          id = res.body.id
          done();
        });
    });
    it('it should delete  the test user by the given id', (done) => {
      chai.request(app)
      .delete('/users/' + id)
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('user Deleted Successfully');
        done();
      });
    });
  });
