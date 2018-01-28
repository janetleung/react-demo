var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var WebpackNotifier = require('webpack-notifier')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve('./src/js/app.js'),
  output: {
    publicPath: '/dist',
    path: path.resolve(__dirname, './dist'),
    filename: 'app.[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '/dist/',
          use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, {
            loader: "sass-loader"
          }]
        })
      }, {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        exclude: /node_modules/,
        use: [
          'url-loader?limit=10000',
        ],
      },
    ]
  },
  plugins: [
    new WebpackNotifier({
      alwaysNotify: true,
      title: 'miniApp',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.html')
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src/js'), 'node_modules'],
    alias: {
      styles: path.resolve(__dirname, 'src/css/'),
    }
  }
}
