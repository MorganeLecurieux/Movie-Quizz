const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        reactVendors: {
          test: /[\\/]node_modules[\\/](react-dom|react-router)[\\/]/,
          name: 'react-vendors',
        },
        apolloVendor: {
          test: /[\\/]node_modules[\\/](\@apollo\/client)[\\/]/,
          name: 'apollo-vendor',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Music Quizz',
      template: path.join(__dirname, 'src', 'index.html'),
      inject: true,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    hot: true,
  },
}

module.exports = (_, args) => {
  if (args.mode === 'production') {
    // I wouldn't really do that in a real production mode but it's so you can check it out easily
    config.plugins.push(new BundleAnalyzerPlugin())
  }

  return config
}
