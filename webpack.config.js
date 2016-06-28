var path = require('path');
var webpack = require('webpack');
var PROD = (process.env.NODE_ENV === 'production') ? true : false;
var WORKDIR = __dirname;
var PLUGINS = !PROD ? [] : [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];
var FILENAME = PROD ? 'NextMoment.min.js' : 'NextMoment.js';

module.exports = {
  entry: [
    path.join(WORKDIR, 'src/NextMoment')
  ],
  output: {
    path: path.join(WORKDIR, 'dist'),
    filename: FILENAME
  },
  debug: true,
  devtool: 'source-map',
  externals: {
    // Use external version of React
    "moment": "moment"
  },
  module: {
    noParse: ["moment"],
    loaders: [{
      test: /\.js$/,
      include: path.join(WORKDIR, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: PLUGINS
};
