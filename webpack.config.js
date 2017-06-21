const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './client/index.js'
  ],
  target: 'web',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel-loader'] },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
    ]
  },
  node: {
    global: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
