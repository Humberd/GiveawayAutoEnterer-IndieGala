const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	entry: "./src/index.ts",
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		ignored: /node_modules/
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "dist")
	},
	devtool: "source-map",
	module: {
		rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.ts?$/,
				loader: "awesome-typescript-loader",
				exclude: [
					/\/node_modules\//
				]
			},
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: "manifest.json",
				to: "./"
			}
		]),
		new CleanWebpackPlugin("dist")
	],
	resolve: {
		extensions: [".ts"]
	}
};