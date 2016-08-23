var del = require("del");
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var path = require("path");

var variables = require("./variables");

// Common shared items build task.
gulp.task("build-shared", ["build-ts-shared"], function() {
    //
});

// Build task for shared items.
gulp.task("build-ts-shared", function() {
    var tsconfig = gulpTypescript.createProject(variables.tsconfigPath);

    return gulp.src([
        path.join(variables.interfaceFolder, "/**/*.ts"),
        variables.typingsIndex
    ])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(variables.interfaceFolder));
});

// Clean task for shared items.
gulp.task("clean-shared", function() {
    del(path.join(variables.interfaceFolder, "/**/*.js"));
    del(path.join(variables.interfaceFolder, "/**/*.js.map"));
});

// Watch task for the shared items.
gulp.task("watch-shared", function() {
    gulp.watch(path.join(variables.interfaceFolder, "/**/*.ts"), ["build-ts-shared"]);
});
