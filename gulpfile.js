/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 5:03 PM -- December 28th, 2022
 * Project: toolkit
 */

import fs from "node:fs/promises";
import path from "node:path";
import gulp from "gulp";
import { deleteAsync } from "del";
import typescript from "gulp-typescript";

function clean() {
	
	return deleteAsync(["./dist"]);
	
}

async function cleanPack(done) {

	const packageJSONFilePath = path.resolve(
		"./",
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
	
	return deleteAsync(path.resolve("./", packFileName));

}

function buildTypeScript(done) {
	
	const project = typescript.createProject("./tsconfig.json");
	
	const pipe = project.src().pipe(project());
	
	pipe.js.pipe(gulp.dest("./dist"));
	pipe.dts.pipe(gulp.dest("./dist/.d.ts"));
	
	done();
	
}

function buildSassModules() {

	return gulp.src("./src/**/*.scss")
		.pipe(gulp.dest("./dist"));

}

function build(done) {
	
	return gulp.parallel(
		buildTypeScript,
		buildSassModules,
	)(done);
	
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
