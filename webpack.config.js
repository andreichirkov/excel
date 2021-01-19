//мы должны экспортировать js объект, который является конфигурацией для вебпака
//для правильного пути контекста лучше делать через path

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//для режимов сборки NODE_ENV системная переменная
//требуется cross-env пакет и указание сборок в package.json
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// console.log('isProd', isProd)
// console.log('isDev', isDev)

//функция добавление экстеншена
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ]

  // if (isDev) {
  //   loaders.push('eslint-loader')
  // }
  return loaders
}

module.exports = {
  // path.resolve(__dirname) путь до папки excel абсолютный и дальше конкотинация с src
  //context чтобы вебпак смотрел за всеми исходниками в папке src
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  //считаем что мы находимся в папке src, тк указали это в контексте
  entry: ['@babel/polyfill' ,'./index.js'],
  //как будет называться общий файл и где будет лежать
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js'],
    //чтобы не было ../../../../component
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core')
    }
  },
  //devtool написано в CONFIGURATION в вебпаке, это системная переменная
  devtool: isDev ? 'source-map' : false,
  devServer: {
    port: 9000,
    hot: isDev
  },
  plugins: [
    //чистит папку дист при npm run build чтобы был новый бандл с новым хешем
    new CleanWebpackPlugin(),
    //в dist будет появляться index.html и в конце подключать в скрипт bundle с хешем
    new HtmlWebpackPlugin({
      //откуда брать шаблон для html, папка не указывается потому что есть context в начале
      template: 'index.html',
      //настройки минификации html
      minify: {
        //удалять комменты и пробелы только в продакшене
        removeComments: isProd,
        collapseWhitespace: isProd
      }
    }),
    //этот плагин чтобы переносить фавикон
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        //компилится справа налево: сначала sass потом css срабатывает
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: path.resolve(__dirname, 'dist')
            }
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        //тут все для бейбла, пресет энв самый хороший
        use: jsLoaders()
      }
    ],
  },
}

//loaders это сущности которые пропускают через себя какой то тип файлов и
//превращают их в js потому что вебпак умеет работать только с js

//тк index.js это точка входа то все импортировать нужно туда
//и модули и scss файлы, и по сути лоадеры сами делают что нужно с ними сами
//webpack-dev-server в package.json чтобы не создавалась статичная папка dist