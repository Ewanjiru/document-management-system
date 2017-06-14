const documentController = require('../controllers').documents;
const middlewares = require('../helpers/middleware');

module.exports = (app) => {
  app.post('/documents', documentController.create);
  app.get('/documents', documentController.list);
  app.get('/documents/:documentId', documentController.retrieve);
  app.get('/search/documents/', documentController.searchDocument);
  app.put('/documents/:documentId', documentController.update);
  app.delete('/documents/:documentId', documentController.delete);

  app.all('/documents/:documentId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
};
