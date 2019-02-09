import path from 'path'
import { Configuration } from 'webpack'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import ForkTSCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const commonConfig: Configuration = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/env', { targets: { browsers: 'last 2 versions' } }],
          '@babel/typescript',
          '@babel/react'
        ],
        plugins: [
          ['emotion', {
            sourceMap: true,
            autoLabel: process.env.NODE_ENV !== 'production',
            labelFormat: '[local]',
            cssPropOptimization: true
          }]
        ]
      }
    }]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new ForkTSCheckerWebpackPlugin({
      tslint: path.resolve(__dirname, '../tslint.json'),
      tslintAutoFix: true,
      reportFiles: ['src/**/*.{ts,tsx}']
    })
  ]
}

export default commonConfig
