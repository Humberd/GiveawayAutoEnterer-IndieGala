const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		index: ["./src/app/index.ts"],
		background: ["./src/background/background.ts"],
		popup: ["./src/app/popup/popup.controller.ts"],
		options: ["./src/app/options/options.controller.ts"]
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
			}, {
				from: "./node_modules/jquery/dist/jquery.js",
				to: "./"
			}
		]),
		new CleanWebpackPlugin("dist"),
		new HtmlWebpackPlugin({
			template: "./src/app/popup/popup.html",
			filename: "./popup/popup.html",
			chunks: ["popup"]
		}),
		new HtmlWebpackPlugin({
			template: "./src/app/options/options.html",
			filename: "./options/options.html",
			chunks: ["options"]
		})
	],
	resolve: {
		extensions: [".ts", ".js"]
	}
};