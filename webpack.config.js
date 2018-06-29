module.exports = {
	entry: './src/index.js',
	output: {
		library: 'VueInputCode',
		libraryTarget: 'umd',
		path: './dist',
		filename: 'VueInputCode.js'
	},
	resolve: {
		extensions: ['.js', '.vue', '.css']
	},
	externals: {
		vue: 'Vue'
	},
	module: {
		loaders: [{
			// 这是处理es6文件
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			query: {
				presets: ['env']
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader'
		}, {
			// 这是处理css文件
			test: /\.css$/,
			loaders: ['style-loader', 'css-loader', 'postcss-loader']
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader',
			query: {
				// Inline files smaller then 10kb as base64 dataURL
				limit: 10000,
				// Fallback to file-loader with this naming scheme
				name: '[name].[ext]?[hash]'
			}
		}]
	},
	vue: {
		postcss: [
			require('autoprefixer')()
		],
	},
	watch: true
}