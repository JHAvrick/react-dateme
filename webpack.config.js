var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src/components');
var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_TEST_DIR = path.resolve(__dirname, 'test/app');
var TEST_BUILD_DIR = path.resolve(__dirname, 'test');

/*
var config = {
	entry: path.resolve(APP_DIR, 'index.jsx'),
	output: {
			path: BUILD_DIR,
			filename: 'react-dateme.js'
	},
	module : {
		loaders : [{
			test : /\.jsx?/,
			include : [APP_DIR],
			loader : 'babel-loader'
		}]
	},
	resolve: {}
}

module.exports = config;
*/


module.exports = [
	{
			name: "react-dateme",

			entry: path.resolve(APP_DIR, 'index.jsx'),

			output: {
					path: BUILD_DIR,
					filename: 'react-dateme.js',
					libraryTarget: 'umd' //MUST be specified to import a bundled component 
			},

			module : {
				loaders : [{
					test : /\.jsx?/,
					include : [APP_DIR],
					loader : 'babel-loader'
				}]
			},

			externals: {
			 'react': 'react', // Case matters here 
			 'react-dom' : 'reactDOM' // Case matters here 
			},

			resolve: {}
	},

	{

			name: "test",

			entry: path.resolve(APP_TEST_DIR, 'app.jsx'),

			output: {
					path: TEST_BUILD_DIR,
					filename: 'bundle.js'
			},

			module : {
				loaders : [{
					test : /\.jsx?/,
					include : [APP_TEST_DIR],
					loader : 'babel-loader'
				}]
			},

			resolve: {
				alias: {
					components: path.resolve(__dirname, 'build')
				}
			}

	}
];
