var del = require("del");
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var path = require("path");
var webpack = require("webpack");

var appDev = "assets/app/";
var assets = "assets/";
var public = "public/";

var stylesheets = "public/stylesheets";

// Variables to help with the paths for the different parts of the project.
var backendDir = path.join(__dirname, "backend");

// Constant reference to the main typings file, used in transpiling to javascript.
var typingsIndex = "typings/index.d.ts";

gulp.task("build-ts", ["build-ts-dll"], function(done) {
    webpack(require("./config/webpack/webpack.dev")).run(onBuild(done));
});

gulp.task("build-ts-dll", function(done) {
    webpack(require("./config/webpack/webpack.dll")).run(onBuild(done));
});

gulp.task("build-ts-watch", function() {
    webpack(require("./config/webpack/webpack.dev")).watch(200, onBuild());
});

gulp.task("build-ts-server", function() {
    var tsconfig = gulpTypescript.createProject("tsconfig.json");

    return gulp.src([
            backendDir + "/**/*.ts",
            typingsIndex
        ])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(backendDir));
});

gulp.task("clean", function() {
    // Cleanup the frontend.
    del(appDev + "/**/*.js");
    del(appDev + "/**/*.js.map");

    // Clean the public directory.
    del(path.join(public, "/**/*"));

    // Cleanup the backend.
    del(backendDir + "/**/*.js");
    del(backendDir + "/**/*.js.map");
});

gulp.task("stylesheets", function() {
    // dragula
    gulp.src(path.resolve("node_modules/dragula/dist/dragula.min.css"))
        .pipe(gulp.dest(stylesheets));

    // Ours.
    gulp.src(path.join(assets + "/stylesheets/*.css"))
        .pipe(gulp.dest(stylesheets));
});

gulp.task("watch", ["build-ts-watch"], function() {
    gulp.watch(appDev + "**/*.ts", ["build-ts"]);
    gulp.watch(path.join(assets + "/**/*.ts"), ["stylesheets"]);
    gulp.watch(backendDir + "/**/*.ts", ["build-ts-server"]);
});

gulp.task("default", ["watch", "build"]);
gulp.task("build", ["build-ts", "stylesheets", "build-ts-server"]);

function onBuild(done) {
    return function(err, stats) {
        if(err) {
            console.log('Error', err);
        }
        else {
            console.log(stats.toString());
        }

        if(done) {
            done();
        }
    }
}
