var del = require("del");
var gulp = require("gulp");
var gulpTypescript = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var path = require("path");

var appDev = "assets/app/";
var appProd = "public/js/app/";
var vendor = "public/js/vendor";

// Variables to help with the paths for the different parts of the project.
var backendDir = path.join(__dirname, "backend");

// Constant reference to the main typings file, used in transpiling to javascript.
var typingsIndex = "typings/index.d.ts";

gulp.task("build-ts", function() {
    var tsconfig = gulpTypescript.createProject("tsconfig.json");

    return gulp.src([
            appDev + "/**/*.ts",
            typingsIndex
        ])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(appProd));
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

gulp.task("build-copy", function() {
    return gulp.src([appDev + "**/*.html", appDev + "**/*.htm", appDev + "**/*.css"])
       .pipe(gulp.dest(appProd));
});

gulp.task("clean", function() {
    del(appProd + "/**/*");

    // Cleanup the backend.
    del(backendDir + "/**/*.js");
    del(backendDir + "/**/*.js.map");
});

gulp.task("vendor", function() {
    gulp.src("node_modules/@angular/**")
        .pipe(gulp.dest(vendor + "/@angular"));

    gulp.src("node_modules/es6-shim/**")
        .pipe(gulp.dest(vendor + "/es6-shim"));

    //reflect metadata
    gulp.src("node_modules/reflect-metadata/**")
        .pipe(gulp.dest(vendor + "/reflect-metadata/"));

    //rxjs
    gulp.src("node_modules/rxjs/**")
        .pipe(gulp.dest(vendor + "/rxjs/"));

    //systemjs
    gulp.src("node_modules/systemjs/**")
        .pipe(gulp.dest(vendor + "/systemjs/"));

    //ng2-bootstrap
    gulp.src("node_modules/ng2-bootstrap/**")
        .pipe(gulp.dest(vendor + "/ng2-bootstrap/"));

    //moment
    gulp.src("node_modules/moment/**")
        .pipe(gulp.dest(vendor + "/moment/"));

    // angular2-jwt
    gulp.src("node_modules/angular2-jwt/**")
        .pipe(gulp.dest(vendor + "/angular2-jwt/"));

    // dragula
    gulp.src("node_modules/dragula/**")
        .pipe(gulp.dest(vendor + "/dragula/"));

    // ng2-dragula
    gulp.src("node_modules/ng2-dragula/**")
        .pipe(gulp.dest(vendor + "/ng2-dragula/"));

    //zonejs
    return gulp.src("node_modules/zone.js/**")
        .pipe(gulp.dest(vendor + "/zone.js/"));
});

gulp.task("watch", function() {
    gulp.watch("app.ts", ["build-ts-server"]);
    gulp.watch("bin/web.ts", ["build-ts-server"]);
    gulp.watch(appDev + "**/*.ts", ["build-ts"]);
    gulp.watch(appDev + "**/*.{html,htm,css}", ["build-copy"]);
    gulp.watch(backendDir + "/**/*.ts", ["build-ts-server"]);
});

gulp.task("default", ["watch", "build"]);
gulp.task("build", ["build-ts", "build-copy", "vendor", "build-ts-server"]);
