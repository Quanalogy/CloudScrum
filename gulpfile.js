var gulp = require("gulp");
var path = require("path");
var requireDir = require("require-dir");
var runSequence = require("run-sequence");

requireDir(path.join(__dirname, "config/gulps"));

// Define the default task.
gulp.task("default", function(done) {
    runSequence("build",
        "watch",
        done
    );
});

// Define a build-all task.
gulp.task("build", ["build-backend", "build-shared", "build-frontend"], function(done) {
    //
});

// Define a clean-all task.
gulp.task("clean", ["clean-backend", "clean-shared", "clean-frontend"], function(done) {
    //
});

// Define a watch-all task.
gulp.task("watch", ["watch-backend", "watch-shared", "watch-frontend"], function(done) {
    //
});
