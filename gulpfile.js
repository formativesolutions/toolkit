/*
 * Created by Trevor Sears <trevor@formativesolutions.io>
 *     (https://formativesolutions.io/).
 * 5:03 PM -- December 28th, 2022
 * Project: @formativesolutions/toolkit
 * 
 * @formativesolutions/toolkit - A toolkit of functions and functionality for
 * building Formative websites.
 * Copyright (C) 2023 Formative Solutions
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
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
