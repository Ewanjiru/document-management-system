const userController = require('../controllers').users;
const middlewares = require('../helpers/middleware');

module.exports = (app) => {
  app.post('/users', userController.create);
  app.post('/users/login', userController.login);
  app.get('/users', middlewares.verifyToken, userController.list);
  app.get('/search/users/', middlewares.verifyToken, userController.searchUser);
  app.get('/users/:userId', middlewares.verifyToken, userController.retrieveOne);
  app.put('/users/:userId', middlewares.verifyToken, userController.update);
  app.get('/users/:userId/documents', middlewares.verifyToken, userController.getUserDocuments);
  app.delete('/users/:userId', middlewares.verifyToken, userController.delete);

  app.all('/users/:documentId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};
