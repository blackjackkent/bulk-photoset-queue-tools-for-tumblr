/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

const VERSION = pkg.version;
module.exports = {
	entry: './src/index.js',
	output: {
		filename: `release.${VERSION}.js`,
		path: path.resolve(__dirname, 'dist')
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		],
		minimize: false
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: `// ==UserScript==
// @name        Tumblr - Bulk Photoset Queue Tools
// @namespace   https://github.com/blackjackkent
// @description A tool for facilitating bulk repeated queueing of image photosets on Tumblr.
// @include     https://www.tumblr.com/blog/*/queue
// @version     1.0
// @grant       none
// @run-at      document-end
// ==/UserScript==
			`,
			raw: true
		})
	]
};
