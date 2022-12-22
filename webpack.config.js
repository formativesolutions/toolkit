import path from "path";
import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

const config = {
	
	mode: "development",
	
	entry: "./ts/main.ts",
	
	devtool: "source-map",
	
	experiments: {
		
		outputModule: true,
		
	},
	
	output: {
		
		path: path.resolve("./js"),
		
		filename: "main.js",
		
		globalObject: "this",
		
		library: {
			
			type: "module",
			
		}
		
	},
	
	module: {
		
		rules: [
			
			// {
			// 	test: /\.(js|jsx)$/,
			// 	use: "babel-loader",
			// 	exclude: /node_modules/,
			// },
			
			{
				test: /\.ts(x)?$/,
				loader: "ts-loader",
				exclude: /node_modules/,
			},
			
		]
		
	},
	
	// optimization: {
	//	
	// 	minimize: true,
	//	
	// 	minimizer: [
	//		
	// 		new TerserPlugin(),
	//		
	// 	]
	//	
	// },
	
	resolve: {
		
		extensions: [
			
			".tsx",
			".ts",
			".js",
			
		],
		
	},
	
};

export default config;
