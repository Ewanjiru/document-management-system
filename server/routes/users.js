const userController = require('../controllers').users;

module.exports = (app) => {
  app.post('/users', userController.create);
  app.get('/users', userController.list);
  //app.post('/users/login', userController.login);
  app.get('/search/users/', userController.searchUser);
  app.get('/users/:userId', userController.retrieveOne);
  app.get('/api/users/', userController.retrieveLimited);
  app.put('/users/:userId', userController.update);
  app.delete('/users/:userId', userController.delete);

  app.all('/users/:documentId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
}
