/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 5:03 PM -- December 28th, 2022
 * Project: toolkit
 */

import fs from "node:fs/promises";
import path from "node:path";
import gulp from "gulp";
import { deleteAsync } from "del";
import webpack from "webpack";
import typescript from "gulp-typescript";
import { getBuildConfig, getWebpackConfig } from "./build.config.js";

const IS_PRODUCTION = true;
const buildConfig = getBuildConfig(IS_PRODUCTION);

function clean() {
	
	return deleteAsync([
		buildConfig.typesOutputDirectory,
		buildConfig.outputDirectory,
	]);
	
}

async function cleanPack(done) {

	const packageJSONFilePath = path.resolve(
		buildConfig.projectRoot,
		"package.json",
	);
	
	const rawPackageJSON = await fs.readFile(packageJSONFilePath, {
		encoding: "utf8",
	});
	
	const packageJSON = JSON.parse(rawPackageJSON);
	
	const packageName = packageJSON.name;
	const packageVersion = packageJSON.version;
	
	let packFileName = "";
	
	if (packageName.startsWith("@")) {
		
		const [
			organizationName,
			basePackageName,
		] = packageName.substring(1).split("/");
		
		packFileName += `${organizationName}-${basePackageName}`;
		
	} else packFileName += packageName;
	
	packFileName += `-${packageVersion}.tgz`;
	
	return deleteAsync(path.resolve(buildConfig.projectRoot, packFileName));

}

function buildTypes() {
	
	const typescriptProject =
		typescript.createProject(buildConfig.tsconfigFile, {
			emitDeclarationOnly: true,
		});
	
	return typescriptProject.src()
		.pipe(typescriptProject())
		.dts
		.pipe(gulp.dest(buildConfig.typesOutputDirectory));
	
}

function compile() {
	
	const webpackConfig = getWebpackConfig(IS_PRODUCTION);
	
	return new Promise((resolve, reject) => {
		
		webpack(webpackConfig, (err, stats) => {
			
			if (err) reject(err);
			else if (stats.hasErrors()) {
				
				const errorMessage = stats.compilation.errors.join("\n");
				
				reject(new Error(errorMessage));
				
			} else resolve();
			
		});
		
	});
	
}

function build(done) {
	
	return gulp.parallel(buildTypes, compile)(done);
	
}

function rebuild(done) {
	
	return gulp.series(clean, build)(done);
	
}

function prepack(done) {
	
	return gulp.parallel(
		cleanPack,
		rebuild,
	)(done);
	
}

function defaultTask(done) {
	
	return rebuild(done);
	
}

Object.entries({
	"default": defaultTask,
	prepack,
	clean,
	cleanPack,
	build,
	rebuild,
}).forEach((task) => gulp.task(...task));
