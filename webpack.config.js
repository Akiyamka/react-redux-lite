const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  devtool: 'source-map',
  devServer: {
    compress: true,
    inline: true,
    port: '8080',
    allowedHosts: [
        '.platform.dev'
    ]
  },
  entry: {
    index: __dirname + '/src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [
          { loader: 'svg-react-loader' }
        ]
      }
    ]
  },
  plugins: [
    htmlPlugin,
    new Dotenv({
      path: './.env'
    }),
    new CopyWebpackPlugin([
      {
          //Note:- No wildcard is specified hence will copy all files and folders
          from: 'src/public/', //Will resolve to RepoDir/src/assets
          to: 'public' //Copies all files from above dest to dist/assets
      },
    ]),
    new SVGSpritemapPlugin(__dirname + '/src/public/icons/*.svg')
  ],
  resolve: {
    alias: {
      Entities: path.resolve(__dirname, 'src/entities/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Services: path.resolve(__dirname, 'src/services/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Config: path.resolve(__dirname, 'src/config/')
    }
  }
};