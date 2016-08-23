var path = require("path");

var projectRoot = path.join(__dirname, "../..");

// Variables to help with the paths for the different parts of the project.
var backendFolder = path.join(projectRoot, "backend/");
var frontendFolder = path.join(projectRoot, "assets/app/");
var interfaceFolder = path.join(projectRoot, "interfaces/");
var publicFolder = path.join(projectRoot, "public/");
var stylesheetsFolder = path.join(projectRoot, "assets/stylesheets/");
var tsconfigPath = path.join(projectRoot, "tsconfig.json");
var webpackFolder = path.join(projectRoot, "config/webpack/");

// Variabels to the components in the public folder.
var appFolderPublic = path.join(publicFolder, "js/");
var stylesheetsFolderPublic = path.join(publicFolder, "stylesheets/");

// Constant reference to the main typings file, used in transpiling typescript to javascript.
var typingsIndex = path.join(projectRoot, "typings/index.d.ts");

exports.appFolderPublic = appFolderPublic;
exports.backendFolder = backendFolder;
exports.frontendFolder = frontendFolder;
exports.interfaceFolder = interfaceFolder;
exports.projectRoot = projectRoot;
exports.stylesheetsFolder = stylesheetsFolder;
exports.stylesheetsFolderPublic = stylesheetsFolderPublic;
exports.tsconfigPath = tsconfigPath;
exports.typingsIndex = typingsIndex;
exports.webpackFolder = webpackFolder;

function onBuild(done) {
    return function(err, stats) {
        if (err) {
            console.log("Error", err);
        }
        else {
            console.log(stats.toString());
        }

        if (done) {
            done();
        }
    }
}

exports.onBuild = onBuild;
