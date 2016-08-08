var gulp = require('gulp');

var gulpTypescript = require('gulp-typescript');
var gulpSourcemaps = require('gulp-sourcemaps');

var del = require('del');

var appDev = 'assets/app/';
var appProd = 'public/js/app/';
var vendor = 'public/js/vendor';

var config = 'config';
var controllers = 'controllers';
var models = 'models';
var routes = 'routes';
var tests = 'tests';
var typingsIndex = 'typings/index.d.ts';

var tsconfig = gulpTypescript.createProject('tsconfig.json');
var tsconfigServer = gulpTypescript.createProject('tsconfig.json');

gulp.task('build-ts', function() {
    return gulp.src([
            appDev + '/**/*.ts',
            typingsIndex
        ])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfig))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest(appProd));
});

gulp.task('build-ts-server', function() {
    return gulp.src([
            'app.ts',
            'bin/www.ts',
            config + '/**/*.ts',
            controllers + '/**/*.ts',
            models + '/**/*.ts',
            routes + '/**/*.ts',
            tests + '/**/*.ts',
            typingsIndex
        ])
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTypescript(tsconfigServer))
        .pipe(gulpSourcemaps.write())
        .pipe(gulp.dest("."));
});

gulp.task('build-copy', function() {
    return gulp.src([appDev + '**/*.html', appDev + '**/*.htm', appDev + '**/*.css'])
       .pipe(gulp.dest(appProd));
});

gulp.task('clean', function() {
    del(appProd + '/**/*');

    // Cleanup config.
    del(config + '/**/*.js');
    del(config + '/**/*.js.map');

    // Cleanup models.
    del(models + '/**/*.js');
    del(models + '/**/*.js.map');

    // Cleanup routes.
    del(routes + '/**/*.js');
    del(routes + '/**/*.js.map');

    // Clean the main server app.
    del('app.js');
    del('app.js.map');

    // Clean the main www app.
    del('bin/www.js');
    del('bin/www.js.map');
});

gulp.task('vendor', function() {
    gulp.src('node_modules/@angular/**')
        .pipe(gulp.dest(vendor + '/@angular'));

    gulp.src('node_modules/es6-shim/**')
        .pipe(gulp.dest(vendor + '/es6-shim'));

    //reflect metadata
    gulp.src('node_modules/reflect-metadata/**')
        .pipe(gulp.dest(vendor + '/reflect-metadata/'));

    //rxjs
    gulp.src('node_modules/rxjs/**')
        .pipe(gulp.dest(vendor + '/rxjs/'));

    //systemjs
    gulp.src('node_modules/systemjs/**')
        .pipe(gulp.dest(vendor + '/systemjs/'));

    //ng2-bootstrap
    gulp.src('node_modules/ng2-bootstrap/**')
        .pipe(gulp.dest(vendor + '/ng2-bootstrap/'));

    //moment
    gulp.src('node_modules/moment/**')
        .pipe(gulp.dest(vendor + '/moment/'));

    //zonejs
    return gulp.src('node_modules/zone.js/**')
        .pipe(gulp.dest(vendor + '/zone.js/'));
});

gulp.task('watch', function() {
    gulp.watch('app.ts', ['build-ts-server']);
    gulp.watch('bin/web.ts', ['build-ts-server']);
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(appDev + '**/*.{html,htm,css}', ['build-copy']);
    gulp.watch(config + '/**/*.ts', ['build-ts-server']);
    gulp.watch(controllers + '/**/*.ts', ['build-ts-server']);
    gulp.watch(models + '/**/*.ts', ['build-ts-server']);
    gulp.watch(routes + '/**/*.ts', ['build-ts-server']);
    gulp.watch(tests + '/**/*.ts', ['build-ts-server']);
});

gulp.task('default', ['watch', 'build']);
gulp.task('build', ['build-ts', 'build-copy', 'vendor', 'build-ts-server']);