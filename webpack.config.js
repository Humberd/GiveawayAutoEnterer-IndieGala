const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
	module: {
		rules: [
			{
				test: /\.ts?$/,
				loader: "awesome-typescript-loader",
				exclude: [/\/node_modules\//]
			}, {
				test: /\.html$/,
				loader: "html-loader"
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: "manifest.json",
				to: "./"
			}, {
				from: "./node_modules/jquery/dist/jquery.js",
				to: "./"
			}
		]),
		new CleanWebpackPlugin("dist"),
	],
	resolve: {
		extensions: [".ts", ".js"]
	}
};