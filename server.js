const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const config = require('./webpack.config');
require('dotenv').config();

const app = express();

const env = process.env.NODE_ENV || 'development';
console.log('env', env);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

require('./server/routes/documents')(app);
require('./server/routes/users')(app);
require('./server/routes/roles')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/index.html'));
});


app.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Document Management System.',
}));

module.exports = app;
