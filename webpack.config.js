const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    './src/js/main.js',
    './src/scss/main.scss',
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: false,
  watchOptions: {
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: '.',
    port: 8080,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'eslint-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['airbnb'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            'sass-loader',
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new StyleLintPlugin({
      configFile: './.stylelintrc',
    }),
    new CopyWebpackPlugin([
      {
        context: './src/static',
        from: '**/*',
        to: './',
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpg|jpeg|png|gif|svg)$/i,
    }),
  ],
};
