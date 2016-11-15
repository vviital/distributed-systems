/* eslint-disable import/no-extraneous-dependencies,  no-var */
var webpack = require('webpack');
var path = require('path');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig;

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(path.resolve(__dirname, './client/index.js'));
webpackConfig = {
  context: __dirname,
  entry: {
    app: './client/index.js',
    vendor: [
      'es6-promise',
      'isomorphic-fetch',
      'jquery',
      'bootstrap',
    ],
  },
  output: {
    path: path.resolve(__dirname, './server/public'),
    filename: 'index.js',
    publicPath: '/assets/',
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var: "Foo"
    library: "client"
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js'],
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack-loader.js', '.web-loader.js', '.loader.js', '.js'],
  },
  devtool: NODE_ENV === 'development' ? 'source-map' : null,
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass']},
      {test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000'},
      {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'},
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, './dist')], {
      root: path.resolve(__dirname, './dist'),
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new VendorChunkPlugin('vendor'),
    new CopyWebpackPlugin([
      { from: 'client/index.html', to: 'index.html' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    })
  ],
};

module.exports = webpackConfig;
