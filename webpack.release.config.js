/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const pkg = require('./package.json');

const VERSION = pkg.version;
module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'release.js',
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
// @name        Bulk Photoset Queue Tools for Tumblr
// @namespace   https://github.com/blackjackkent
// @description A tool for facilitating bulk repeated queueing of image photosets on Tumblr.
// @author      Rosalind Wills (@blackjackkent)
// @website     https://www.patreon.com/blackjacksoftware
// @include     https://www.tumblr.com/
// @downloadURL https://raw.githubusercontent.com/blackjackkent/bulk-photoset-queue-tools-for-tumblr/production/dist/release.js
// @updateURL   https://raw.githubusercontent.com/blackjackkent/bulk-photoset-queue-tools-for-tumblr/production/dist/release.js
// @version     ${VERSION}
// @grant       none
// @run-at      document-end
// ==/UserScript==
			`,
			raw: true
		})
	]
};
