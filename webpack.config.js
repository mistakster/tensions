var webpack = require('webpack');

function isHmr() {
	return process.env.NODE_ENV === 'hmr';
}

function isProduction() {
	return process.env.NODE_ENV === 'production';
}

module.exports = {
	entry: {
		'app': !isHmr() ? [
			'./src/index.js'
		] : [
			'webpack-hot-middleware/client?path=http://127.0.0.1:3000/__webpack_hmr',
			'./src/index.js'
		]
	},

	output: {
		filename: '[name].js',
		path: __dirname + '/build',
		publicPath: '/build/'
	},

	module: {
		loaders: (function () {
			var loaders = [];

			loaders.push({
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/,
				query: Object.assign({presets: ['es2015']}, !isHmr() ? {} : {})
			}, {
				test: /\.css$/,
				loader: 'style!css'
			});

			return loaders;
		})()
	},

	plugins: (function () {
		var plugins = [];

		plugins.push(
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
			}),
			new webpack.optimize.OccurenceOrderPlugin()
		);

		if (isHmr()) {
			plugins.push(
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NoErrorsPlugin()
			);
		}

		if (isProduction()) {
			plugins.push(
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.UglifyJsPlugin({
					compress: {
						warnings: false
					}
				})
			);
		}

		return plugins;
	})(),

	devtool: isProduction() ? 'source-map' : 'eval'
};
