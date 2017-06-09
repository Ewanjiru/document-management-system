const documentController = require('../controllers').documents;

module.exports = (app) => {
  app.post('/documents', documentController.create);
  app.get('/documents', documentController.list);
  app.get('/documents/:documentId', documentController.retrieve);
  app.get('/limit/documents/', documentController.retrieveLimited);
  app.get('/search/documents/', documentController.searchDocument);
  app.get('/users/:userId/documents', documentController.getUserDocuments);
  app.put('/documents/:documentId', documentController.update);
  app.delete('/documents/:documentId', documentController.delete);

  app.all('/documents/:documentId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
}
