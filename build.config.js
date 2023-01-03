/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 5:19 PM -- December 28th, 2022
 * Project: toolkit
 */

import url from "node:url";
import path from "node:path";
import TerserPlugin from "terser-webpack-plugin";
import nodeExternals from "webpack-node-externals";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";

/**
 * Returns the build config object for the specified environment (defaults to
 * production).
 * 
 * @param {boolean} isProduction If set to true, the returned config will be for
 * production builds, otherwise the returned config will be for development
 * builds. Defaults to true.
 * @returns {object} The build config object for the specified environment
 * (defaults to production). 
 */
export function getBuildConfig(isProduction = true) {
	
	// The path to the directory containing *this* file.
	const dirname = path.dirname(url.fileURLToPath(import.meta.url));
	// const dirname = __dirname;
	
	const projectRoot = dirname;
	const sourceDirectory = path.resolve(projectRoot, "src");
	const outputDirectory = path.resolve(projectRoot, "dist");
	const typesOutputDirectory = path.resolve(outputDirectory, ".d.ts");
	const entryFile = path.resolve(sourceDirectory, "main.ts");
	const bundleFile = path.resolve(outputDirectory, "main.js");
	const tsconfigFile = path.resolve(projectRoot, "tsconfig.json");
	const extensionsToResolve = [".tsx", ".ts", ".js"];
	
	return {
		projectRoot,
		sourceDirectory,
		outputDirectory,
		typesOutputDirectory,
		entryFile,
		bundleFile,
		tsconfigFile,
		extensionsToResolve,
	};
	
}

/**
 * The base Webpack configuration for this package (environment-agnostic).
 */
const BASE_WEBPACK_CONFIG = {
	experiments: {
		outputModule: true,
	},
	output: {
		globalObject: "this",
		library: {
			type: "module",
		},
	},
	module: {
		rules: [
			{
				test: /\.s?css$/u,
				oneOf: [
					{
						test: /\.module\.s?css$/u,
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
		// TODO [12/28/22 @ 5:37 PM] This is a temporary fix needed until
		//     'importType: module' is recognized.
		importType: "module",
	})],
	resolve: {
		// enforceExtension: true,
	},
};

/**
 * Returns the Webpack config object for the specified environment (defaults to
 * production).
 * 
 * @param {boolean} isProduction If set to true, the returned config will be for
 * production builds, otherwise the returned config will be for development
 * builds. Defaults to true.
 * @returns {object} The Webpack config object for the specified
 * environment (defaults to production).
 */
export function getWebpackConfig(isProduction = true) {
	
	const buildConfig = getBuildConfig(isProduction);
	
	let config = {
		...BASE_WEBPACK_CONFIG ?? {},
		mode: isProduction ? "production" : "development",
		entry: buildConfig.entryFile,
		output: {
			...BASE_WEBPACK_CONFIG?.output ?? {},
			path: buildConfig.outputDirectory,
			filename: path.basename(buildConfig.bundleFile),
		},
		module: {
			...BASE_WEBPACK_CONFIG?.module ?? {},
			rules: [
				{
					test: /\.tsx?$/u,
					exclude: /node_modules/u,
					use: {
						loader: "swc-loader",
						options: getSWCConfig(isProduction),
					},
				},
				...BASE_WEBPACK_CONFIG?.module?.rules ?? [],
			],
		},
		resolve: {
			...BASE_WEBPACK_CONFIG?.resolve ?? {},
			extensions: buildConfig.extensionsToResolve,
			extensionAlias: {
				".js": buildConfig.extensionsToResolve,
			},
		},
	};
	
	if (isProduction) {
		
		config.optimization = {
			minimize: true,
			minimizer: [new TerserPlugin()],
		};
		
	} else {
		
		config.devtool = "source-map";
		config.stats = {
			errorDetails: true,
		};
		
	}
	
	return config;
	
}

/**
 * The base SWC configuration for this package (environment-agnostic). 
 */
const BASE_SWC_CONFIG = {
	test: "\\.tsx?$",
	jsc: {
		parser: {
			syntax: "typescript",
			tsx: true,
			decorators: true,
			dynamicImport: true,
		},
		target: "es2022",
		// transform: {
		// 	react: {
		// 		runtime: "automatic",
		// 		importSource: "@emotion/react",
		// 	},
		// },
		keepClassNames: true,
	},
	module: {
		type: "es6",
		strict: false,
		strictMode: true,
		lazy: false,
		noInterop: false,
	},
};

/**
 * Returns the SWC config object for the specified environment (defaults to
 * production).
 *
 * @param {boolean} isProduction If set to true, the returned config will be for
 * production builds, otherwise the returned config will be for development
 * builds. Defaults to true.
 * @returns {object} The SWC config object for the specified environment
 * (defaults to production).
 */
export function getSWCConfig(isProduction = true) {
	
	let config = BASE_SWC_CONFIG;
	
	return config;
	
}
