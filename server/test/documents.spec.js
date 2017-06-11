let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();

chai.use(chaiHttp);

/*
 * Test the /POST route
 */
  // describe('/post endpoint', () => {
  //   it('it should create a new document', (done) => {
  //     let docs={
  //       title:'This Test Document',
  //       content: 'It is good habit to always spend unfortunately it is often underestimated.',
  //       access: 'public',
  //       userId: 1
  //     }
  //     chai.request(app)
  //       .post('/documents')
  //       .send(docs)
  //       .end((err, res) => {
  //         console.log(res.body)
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('message').eql('Document Created Successfully');
  //         done();
  //       });
  //   });
  // });
/*
 * Test the /GET route
 */
  describe('/get endpoint', () => {
    it('it should retrieve all the documents', (done) => {
        chai.request(app)
        .get('/documents')
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
//   describe('/get/documents/id endpoint', () => {
//     let documents={
//       title: 'This Test Document',
//       content: 'It is good habit to always spend some time making tests to assure a server as reliable as possible but unfortunately it is often underestimated.',
//       access: 'admin',
//       userId: 1,
//     }
//     let id = null
//     it('it should create a test documents', (done) => {
//       chai.request(app)
//         .post('/documents')
//         .send(documents)
//         .end((err, res) => {
//           id = res.body.id
//           done();
//       });
//     });
//     it('Should retrieve documents just created by the given the id',(done)=> {
//       chai.request(app)
//       .get('/documents/'+id)
//       .end((err,res)=>{
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         res.body.should.have.property('id');
//         res.body.should.have.property('title');
//         res.body.should.have.property('content');
//         res.body.should.have.property('access');
//         res.body.should.have.property('userId');
//         done();
//       })
//     });
//   });
// /*
//  * Test the get by offset
//  */
//   describe('/get by given offset and limit endpoint', () => {
//     let limit = 1;
//     let offset = 1;
//     it('it should retrieve the second documents id 2', (done) => {
//         chai.request(app)
//         .get('/limit/documents/?limit='+limit+'&offset='+offset)
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('array');
//             res.body.length.should.be.eql(1);
//           done();
//         });
//       });
//   });
// /*
//  * Test the update 
//  */
//   describe('/put router',()=>{
//     it('it should retrieve the fist documents and update their title to Hello World', (done) => {
//         chai.request(app)
//         .put('/documents/1')
//         .send({title:'Hello World'})
//         .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('message').eql('Document updated Successfully.');
//           done();
//         });
//       });

//   });
// /*
//  * Test the /delete route
//  */
//   describe('/delete/documents/:id ', () => {
//     let user={
//       title: 'This Test Document',
//       content: 'It is good habit to always spend some time making tests to assure a server as reliable as possible but unfortunately it is often underestimated.',
//       access: 'admin',
//       userId: 2,
//     }
//     let id = null
//     it('it should create a test document', (done) => {
//       chai.request(app)
//         .post('/documents')
//         .send(user)
//         .end((err, res) => {
//           id = res.body.id
//           done();
//         });
//     });
//     it('it should delete  the test document by the given id', (done) => {
//       chai.request(app)
//       .delete('/documents/' + id)
//       .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           res.body.should.have.property('message').eql('Document Deleted Successfully');
//         done();
//       });
//     });
//   });
