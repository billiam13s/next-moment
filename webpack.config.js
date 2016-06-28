var path = require('path');
var webpack = require('webpack');
var PROD = (process.env.NODE_ENV === 'production') ? true : false;

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
    __dirname + '/src/NextMoment'
  ],
  output: {
    path: __dirname + "/dist",
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
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: PLUGINS
};
