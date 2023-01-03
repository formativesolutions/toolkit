/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 5:03 PM -- December 28th, 2022
 * Project: toolkit
 */

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

function defaultTask(done) {
	
	return rebuild(done);
	
}

const TASKS = {
	"default": defaultTask,
	clean,
	build,
	rebuild,
};

for (const [taskName, taskFunction] of Object.entries(TASKS)) {
	
	gulp.task(taskName, taskFunction);
	
}
