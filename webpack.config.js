const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let debug = process.env.NODE_ENV !== 'production';

module.exports = {
	entry: path.resolve(__dirname, 'src/js/main.js'),
	plugins: [
		new HtmlWebpackPlugin({
			title: 'WebGl',
			template: path.resolve(__dirname, 'src/index.html'),
		})
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	resolve: {
		alias: {
			Shader: path.resolve(__dirname, 'src/shader/'),
			JS: path.resolve(__dirname, 'src/js/'),
		},
	},
	module: {
		rules: [
			{ 
				test: /\.glsl$/, 
				use: 'webpack-glsl',
				include: path.resolve(__dirname, 'src/shader/'), 
			},	{ 
				test: /\.js$/, 
				use: 'babel',
				include: path.resolve(__dirname, 'src/js/'),
				exclude: /(node_modules|bower_components)/,
				options: {
					cacheDirectory: true,
                    presets: ['env'],
				} 
			}
		],
	},
	devtool: debug ? 'eval-source-map' : 'source-map',
}