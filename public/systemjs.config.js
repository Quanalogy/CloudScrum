/**
 * Created by munk on 08-08-16.
 */

var map = {
    'app': 'js/app',
    'rxjs': 'js/vendor/rxjs',
    '@angular': 'js/vendor/@angular',
    'ng2-bootstrap': 'js/vendor/ng2-bootstrap',
    'moment': 'js/vendor/moment/moment.js',
    'angular2-jwt': 'js/vendor/angular2-jwt/angular2-jwt.js',
    'ng2-dragula': 'js/vendor/ng2-dragula',
    'dragula': 'js/vendor/dragula/dist/dragula.min.js'
};

var packages = {
    'app': { main: 'boot.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
    'ng2-bootstrap': { defaultExtension: 'js' },
    'ng2-dragula': { defaultExtension: 'js' }
};

var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/forms',
    '@angular/testing',
    '@angular/upgrade'
];

packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
});

var config = {
    map: map,
    packages: packages
};

System.config(config);