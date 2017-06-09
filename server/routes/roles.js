const roleController = require('../controllers').roles;

module.exports = (app) => {
  app.post('/roles', roleController.create);
  app.get('/roles', roleController.list);
  app.delete('/roles/:roleId', roleController.delete);
}