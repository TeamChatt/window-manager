const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  entry: {
    index: ['./example/src/index.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 25000,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      '#style':  path.resolve(__dirname, 'src/style/'),
      'window-manager': path.resolve(__dirname, 'src/'),
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './example/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
}
