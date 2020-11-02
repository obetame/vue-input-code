const {VueLoaderPlugin} = require("vue-loader");

module.exports = {
  entry: './example/index.js',
  mode: 'development',
  output: {
    library: 'VueInputCode',
    libraryTarget: 'umd',
    path: __dirname + '/example',
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json'],
  },
  module: {
    rules: [{
      // 这是处理es6文件
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-transform-runtime']
      }
    }, {
      //这是处理scss文件
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.vue$/,
      include: /src/,
      loader: 'vue-loader',
    }, {
      // 这是处理css文件
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'url-loader',
      options: {
        // Inline files smaller then 10kb as base64 dataURL
        limit: 10000,
        // Fallback to file-loader with this naming scheme
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  watch: false,
  plugins: [new VueLoaderPlugin()]
}