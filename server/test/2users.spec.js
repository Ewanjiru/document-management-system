const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const should = chai.should();

chai.use(chaiHttp);
let Token = '';

const user = {
  email: 'ex@gmail.com',
  password: '1Eunice@',
};

describe('Users Tests:', () => {
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
   * Test the /login with wrong password
   */
  describe('test login with wrong password', () => {
    const userTest = {
      email: 'ex@',
      password: '1ee',
    };
    it('it should fail login due to invalid password', (done) => {
      chai.request(app)
        .post('/users/login')
        .send(userTest)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: That user email does not exist');
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe('/post endpoint', () => {
    it('it should create a new user', (done) => {
      const user = {
        firstName: 'Niccie',
        lastName: 'Sheero',
        email: 'ex@gmail.com',
        password: '1Eunice@',
        roleType: 'admin'
      };
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('User Created Successfully');
          done();
        });
    }).timeout(10000);
  });
  /*
   * Test the /POST route with empty fields
   */
  describe('/post endpoint', () => {
    it('it should create a new user', (done) => {
      const user = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleType: ''
      };
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: Fill all fields');
          done();
        });
    }).timeout(10000);
  });

  /*
   * Test the /POST route with wrong password format
   */
  describe('/post endpoint', () => {
    it('it should create a new user', (done) => {
      const user = {
        firstName: 'Niccie',
        lastName: 'Sheero',
        email: 'ex@gmail.com',
        password: '2333',
        roleType: 'admin'
      };
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: Password must contain:one digit from 0-9, one lowercase characters, one uppercase characters, one special symbols and at least 8 characters');
          done();
        });
    }).timeout(10000);
  });

  /*
    * Test the /POST route with wrong email format
    */
  describe('/post endpoint', () => {
    it('it should create a new user', (done) => {
      const user = {
        firstName: 'Niccie',
        lastName: 'Sheero',
        email: 'ex',
        password: '1Eunice@',
        roleType: 'admin'
      };
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: Email format is incorrect');
          done();
        });
    }).timeout(10000);
  });


  /*
  * Test the /login route
  */
  describe('/post endpoint login', () => {
    it('it should log in a new user', (done) => {
      const user = {
        email: 'ex@gmail.com',
        password: '1Eunice@',
      };
      chai.request(app)
        .post('/users/login')
        .send(user)
        .end((err, res) => {
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
  describe('/get/users/id endpoint', () => {
    const id = 1;
    it('Should retrieve user just created by the given the id', (done) => {
      chai.request(app)
        .get(`/users/${id}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.should.have.property('email');
          done();
        });
    });
  });

  /*
   * Test the /GET by unexisting id route
   */
  describe('/get/users/id endpoint', () => {
    const id = 20;
    it('Should fail as does not exist', (done) => {
      chai.request(app)
        .get(`/users/${id}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: User not found');
          done();
        });
    });
  });
  /*
  * Test the get by offset
  */
  describe('/get by given offset and limit endpoint', () => {
    let limit = 1;
    let offset = 1;
    it('it should return message user not found as we have only one user', (done) => {
      chai.request(app)
        .get(`/users/?limit=${limit}&offset=${offset}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Error: user not found');
          done();
        });
    });

    it('it should return  user with id 1', (done) => {
      limit = 1;
      offset = 0;
      chai.request(app)
        .get(`/users/?limit=${limit}&offset=${offset}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  /*
  * Test the update user
  */
  describe('/put router', () => {
    it('it should retrieve the first user and update their name to Nancy', (done) => {
      chai.request(app)
        .put('/users/1')
        .set('x-access-token', Token)
        .send({ firstName: 'Nancy' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('user updated Successfully.');
          //res.body.should.have.property('firstName').eql('Nancy');
          done();
        });
    });
  });

  /*
  * Test the update unexisting user
  */
  describe('/put router', () => {
    it('it should fail as user does not exist', (done) => {
      chai.request(app)
        .put('/users/90')
        .set('x-access-token', Token)
        .send({ firstName: 'Nancy' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Error: User Not Found');
          done();
        });
    });
  });

  /*
  * test user search existing
  */
  describe('/search/users/ endpoint', () => {
    const search = 'an';
    it('Should search user', (done) => {
      chai.request(app)
        .get(`/search/users/?q=${search}`)
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
  * test user search not existing
  */
  describe('/search/users/  endpoint', () => {
    const search = 'funny';
    it('Should search documents', (done) => {
      chai.request(app)
        .get(`/search/users/?q=${search}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Error: No User found');
          done();
        });
    });
  });
  /*
  * Test the /count route
  */
  describe('/count/ endpoint', () => {
    it('it should retrieve count of all the users', (done) => {
      chai.request(app)
        .get('/count/users')
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          res.body.user.should.have.property('count').eql(1);
          done();
        });
    });
  });
  /*
  * Test the /delete user
  */
  describe('/delete/users/:id ', () => {
    const user = {
      firstName: 'Niccie',
      lastName: 'Sheero',
      email: 'exes@gmail.com',
      password: 'Qwerty@1234',
      roleType: 'admin'
    };
    let id = null;

    it('it should create a test user', (done) => {
      chai.request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          id = res.body.id;
          done();
        });
    });

    it('it should log in that user', (done) => {
      const testUser = {
        email: 'exes@gmail.com',
        password: 'Qwerty@1234',
      };
      chai.request(app)
        .post('/users/login')
        .send(testUser)
        .end((err, res) => {
          Token = res.body.Token;
          done();
        });
    });
    it('it should delete  the test user by the given id', (done) => {
      chai.request(app)
        .delete(`/users/${id}`)
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('user Deleted Successfully');
          done();
        });
    });
  });
  /*
  * Test the /delete not existing user
  */
  describe('/delete endpoint', () => {
    it('it should delete  the test user by the given id', (done) => {
      chai.request(app)
        .delete('/users/10')
        .set('x-access-token', Token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Error: User Not Found');
          done();
        });
    });
  });
  /*
  * Test the /logout user
  */
  describe('/logout endpoint', () => {
    it('it should logout the user', (done) => {
      chai.request(app)
        .post('/users/logout')
        .send(Token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
