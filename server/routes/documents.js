const documentController = require('../controllers').documents;
const middlewares = require('../helpers/middleware');

module.exports = (app) => {
  app.post('/documents', middlewares.verifyToken, documentController.create);
  app.get('/documents', middlewares.verifyToken, documentController.list);
  app.get('/count/documents', middlewares.verifyToken, documentController.count);
  app.get('/documents/:documentId', middlewares.verifyToken, documentController.retrieve);
  app.get('/search/documents/', middlewares.verifyToken, documentController.searchDocument);
  app.get('/role/documents/:role', middlewares.verifyToken, documentController.getUserRoleDocuments);
  app.put('/documents/:documentId', middlewares.verifyToken, documentController.update);
  app.delete('/documents/:documentId', middlewares.verifyToken, documentController.delete);

  app.all('/documents/:documentId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};
