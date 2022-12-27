import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

const EXTENSIONS = [".tsx", ".ts", ".js"];

const baseConfig = {
	entry: "./ts/main.js",
	experiments: {
		outputModule: true,
	},
	output: {
		path: path.resolve("./js"),
		filename: "main.js",
		globalObject: "this",
		library: {
			type: "module",
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "swc-loader",
				},
			},
			{
				test: /\.s?css$/,
				oneOf: [
					{
						test: /\.module\.s?css$/,
						use: [
							MiniCSSExtractPlugin.loader,
							{
								loader: "css-loader",
								options: {
									modules: true,
								},
							},
							"sass-loader",
						],
					},
					{
						use: [
							MiniCSSExtractPlugin.loader,
							"css-loader",
							"sass-loader",
						],
					},
				],
			},
		],
	},
	plugins: [
		new MiniCSSExtractPlugin(),
	],
	externalsPresets: {
		node: true,
	},
	externals: [nodeExternals({
		importType: "module",
	})],
	resolve: {
		// enforceExtension: true,
		extensions: EXTENSIONS,
		extensionAlias: {
			".js": EXTENSIONS,
		},
	},
};

function buildModeFromString(
	input,
	modes = ["production", "development"],
	fallback = modes[modes.length - 1],
) {
	
	for (let mode of modes) {
		
		const compareLength = Math.min(input.length, mode.length);
		const inputCompareString = input.substring(0, compareLength);
		const modeCompareString = mode.substring(0, compareLength);
		
		if (inputCompareString === modeCompareString) return mode;
		
	}
	
	return fallback;
	
}

export default (env, argv) => {
	
	if (process.env.npm_config_mode) {
		
		argv.mode = buildModeFromString(process.env.npm_config_mode);
		
	} else if (argv.mode) {
		
		argv.mode = buildModeFromString(argv.mode);
		
	} else argv.mode = "development";
	
	const isDebug = argv.mode !== "production";
	
	let config = baseConfig;
	
	config.mode = isDebug ? "development" : "production";
	
	if (isDebug) {
		
		config.devtool = "source-map";
		config.stats = {
			errorDetails: true,
		};
		
	} else {
		
		config.output.clean = true;
		config.optimization = {
			minimize: true,
			minimizer: [ new TerserPlugin() ],
		};
		
	}
	
	return config;
	
};
