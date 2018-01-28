var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var WebpackNotifier = require('webpack-notifier')
var LiveReloadPlugin = require('webpack-livereload-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: path.resolve('./src/js/app.js'),
  output: {
    publicPath: '/dist',
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
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
              minimize: true,
              sourceMap: true
            }
          }, {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
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
    new LiveReloadPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve('./src/index.dev.html')
    }),
    new ExtractTextPlugin({
      filename: 'app.css'
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
