const path = require('path');
const merge = require('webpack-merge');
const getConfiguration = mode => require(`./webpack/${mode}.js`);

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = ({mode}) => merge(
  {
    entry: './dev/main.js',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'), 
    },
    plugins: [new HtmlWebpackPlugin({
      template: './dev/index.html'
    })]
  },
  getConfiguration(mode)
);