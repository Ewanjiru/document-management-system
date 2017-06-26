import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import config from './webpack.config';

const app = express();
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
