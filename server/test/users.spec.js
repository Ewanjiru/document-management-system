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

  //   describe('/delete/roles/:id ', () => {
  //     it('it should delete a role by the given id', (done) => {
  //       let roleId = 1;
  //       chai.request(app)
  //       .delete('/roles/' + roleId)
  //       .end((err, res) => {
  //           res.should.have.status(200);
  //           res.body.should.be.a('object');
  //           res.body.should.have.property('message').eql('Role Deleted Successfully');
  //         done();
  //       });
  //     });
  // });
