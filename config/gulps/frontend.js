var del = require("del");
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var path = require("path");
var spawn = require("child_process").spawn;
var webpack = require("webpack");

var variables = require("./variables");

// Common frontend build task.
gulp.task("build-frontend", ["build-ts-frontend", "build-stylesheets", "build-webpack-dll", "build-webpack"], function() {
    //
});

// Build task for the frontend.
gulp.task("build-ts-frontend", function() {
    var tsconfig = gulpTypescript.createProject(variables.tsconfigPath);

    return gulp.src([
        path.join(variables.frontendFolder, "/**/*.ts"),
        variables.typingsIndex
    ])
        .pipe(gulpSourcemaps.init())
        .pipe(tsconfig())
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
gulp.task("build-webpack", ["build-webpack-dll", "build-ts-frontend"], function(done) {
    webpack(require(path.join(variables.webpackFolder, "webpack.dev"))).run(variables.onBuild(done));
});

// Build task for webpack static assets (Vendor).
gulp.task("build-webpack-dll", ["build-ts-frontend"], function(done) {
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
gulp.task("watch-frontend", ["watch-webpack"], function() {
    gulp.watch(path.join(variables.stylesheetsFolder + "/**/*.css"), ["build-stylesheets"]);
});

// Start the webpack watch task.
// TODO fix if files exists for the first spawn.
// For Alex "/home/munk/.local/install/node/bin/webpack" is first argument in spawn.
// For Magnus "webpack" is first argument in spawn
gulp.task("watch-webpack", function(done) {
    // TODO: Maybe switch to cross-spawn?
    const webpackWatchHandle = spawn("/home/munk/.local/install/node/bin/webpack", ["--watch", "--colors", "--config", path.join(variables.webpackFolder, "webpack.dev")]);

    webpackWatchHandle.stderr.on("data", function(data) {
        console.log("stderr:" + data);
    });

    webpackWatchHandle.stdout.on("data", function(data) {
        console.log("stdout:" + data);
    });

    webpackWatchHandle.on("close", function(exitCode, exitSignal) {
        if (exitCode !== null) {
            console.log("webpack exited with " + exitCode.toString() + ".");
        } else {
            console.log("webpack exited with signal " + exitSignal + ".");
        }
    });

    // Register an event that will close down webpack if we stop gulp.
    process.on("SIGINT", function () {
        webpackWatchHandle.kill();
    });
    webpackWatchHandle.on("error", function (err) {
        throw err;
    });

    done();
});
