const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	entry: {
		index: ["./src/app/index.ts"]
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		ignored: /node_modules/
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist")
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: "awesome-typescript-loader",
				exclude: [/\/node_modules\//],
			}, {
				test: /\.html$/,
				loader: "html-loader"
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: "manifest.json",
				to: "./"
			}, {
				from: "./node_modules/jquery/dist/jquery.min.js",
				to: "./"
			}, {
				from: "./node_modules/rxjs/bundles/Rx.min.js",
				to: "./"
			}, {
				from: "./src/background/hot-reload.js",
				to: "./"
			}, {
				from: "./assets/",
				to: "./"
			}
		]),
		new ExtractTextPlugin('styles.css'),
		new CleanWebpackPlugin("dist")
	],
	resolve: {
		extensions: [".ts", ".js"]
	}
};