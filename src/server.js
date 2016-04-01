/* eslint-disable no-var */
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var serveStatic = require('serve-static');
var config, compiler, app;

process.env.NODE_ENV = 'hmr';

config = require('../webpack.config.js');
compiler = webpack(config);
app = express();

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/build', serveStatic('./build'));

app.get('/', function (req, res) {
	res.sendFile('./index.html', {
		root: process.cwd()
	});
});

app.get('/index.html', function (req, res) {
	res.redirect('/');
});

app.listen(3000, function () {
	console.log('Listening at http://127.0.0.1:3000'); // eslint-disable-line no-console
});
