// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let app = require('../../app');
// let should = chai.should();

// chai.use(chaiHttp);

// /*
//  * Test the /POST route
//  */
//   describe('/post endpoint', () => {
//     it('it should create a new role', (done) => {
//       let arole={
//         title: 'This World',
//         content: 'Blah Blah Blah Blah Blah',
//         access: 'public',
//         userId: '1',
//       }
//       chai.request(app)
//         .post('/roles')
//         .send(arole)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           done();
//         });
//     });

//       it('it should retrieve all the roles', (done) => {
//         chai.request(app)
//         .get('/roles')
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('array');
//             res.body.length.should.be.eql(1);
//           done();
//         });
//       });
//   });

//     describe('/delete/roles/:id ', () => {
//       it('it should delete a role by the given id', (done) => {
//         let roleId = 1;
//         chai.request(app)
//         .delete('/roles/' + roleId)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message').eql('Role Deleted Successfully');
//           done();
//         });
//       });
//   });
