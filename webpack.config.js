const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: ["./src/app/index.ts"],
		background: ["./src/background/background.ts"]
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
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.ts?$/,
				loader: "awesome-typescript-loader",
				exclude: [/\/node_modules\//]
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: "manifest.json",
				to: "./"
			}
		]),
		new CleanWebpackPlugin("dist"),
		new HtmlWebpackPlugin({
			template: "./src/app/index.html",
			filename: "./index.html",
			chunks: ["index"]
		})
	],
	resolve: {
		extensions: [".ts", ".css"]
	}
};