var del = require("del");
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var path = require("path");
var webpack = require("webpack");

var variables = require("./variables");

// Build task for the frontend.
gulp.task("build-ts-frontend", function() {
    var tsconfig = gulpTypescript.createProject(variables.typingsIndex);

    return gulp.src([
        path.join(variables.frontendFolder, "/**/*.ts"),
        variables.typingsIndex
    ])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(variables.frontendFolder));
});

// Build task for stylesheets.
gulp.task("build-stylesheets", function() {
    // Dragula.
    gulp.src(path.join(variables.projectRoot, "node_modules/dragula/dist/dragula.min.css"))
        .pipe(gulp.dest(variables.stylesheetsFolderPublic));

    // Ours.
    gulp.src(path.join(variables.stylesheetsFolder + "/**/*.css"))
        .pipe(gulp.dest(variables.stylesheetsFolderPublic));
});

// Build task for webpack.
gulp.task("build-webpack-dll", ["build-webpack-dll"], function(done) {
    webpack(require(path.join(variables.webpackFolder, "webpack.dev"))).run(variables.onBuild(done));
});

// Build task for webpack static assets (Vendor).
gulp.task("build-webpack-dll", function(done) {
    webpack(require(path.join(variables.webpackFolder, "webpack.dll"))).run(variables.onBuild(done));
});

// Build task for static assets.
// TODO: Images etc.

// Clean task for the frontend.
gulp.task("clean-frontend", function() {
    // Clean the frontend folder.
    del(path.join(variables.frontendFolder, "/**/*.js"));
    del(path.join(variables.frontendFolder, "/**/*.js.map"));

    // Clean the public folder.
    del(path.join(variables.appFolderPublic, "*"));
});

// Watch task for the frontend.
gulp.task("watch-frontend", function() {
    gulp.watch(path.join(variables.frontendFolder, "/**/*.ts"), ["build-ts-frontend"]);
    gulp.watch(path.join(variables.stylesheetsFolder + "/**/*.css"), ["build-stylesheets"]);
});
