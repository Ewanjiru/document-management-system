const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
process.env.SECRET_KEY = 'superSecretString';
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./server/routes/documents')(app);
require('./server/routes/users')(app);
require('./server/routes/roles')(app);
app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Document Management System.',
}));

module.exports = app;