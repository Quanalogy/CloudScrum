var del = require("del");
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var path = require("path");

var variables = require("./variables");

// Common backend build task.
gulp.task("build-backend", ["build-ts-backend"], function() {
    //
});

// Build task for the backend.
gulp.task("build-ts-backend", function() {
    var tsconfig = gulpTypescript.createProject(variables.tsconfigPath);

    return gulp.src([
        path.join(variables.backendFolder, "/**/*.ts"),
        variables.typingsIndex
    ])
        .pipe(gulpSourcemaps.init())
        .pipe(tsconfig())
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(variables.backendFolder));
});

// Clean task for the backend.
gulp.task("clean-backend", function() {
    del(path.join(variables.backendFolder, "/**/*.js"));
    del(path.join(variables.backendFolder, "/**/*.js.map"));
});

// Watch task for the backend.
gulp.task("watch-backend", function() {
    gulp.watch(path.join(variables.backendFolder, "/**/*.ts"), ["build-ts-server"]);
});
