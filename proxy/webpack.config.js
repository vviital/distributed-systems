/* eslint-disable import/no-extraneous-dependencies,  no-var */
var webpack = require('webpack');
var path = require('path');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig;

const NODE_ENV = process.env.NODE_ENV || 'development';

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
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
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
  ],
};

module.exports = webpackConfig;
