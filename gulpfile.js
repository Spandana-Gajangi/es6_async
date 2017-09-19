let gulp = require("gulp");
let babel = require('gulp-babel');
let nodemon = require('gulp-nodemon');
let process = require("process");
let started = !1;
// let paths = {
//     js: [
//         'dist/*.js',
//         '!node_modules',

//     ]
// };
gulp.task('default', function () {
    console.log('default')
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});
gulp.task("build", function () {
    console.log('build------------')
    return gulp.src('src/**/*.js')
        .pipe(gulp.dest("lib").on('end', () => {
            console.log('Build Success')
            process.exit(0);
        }));
});

gulp.watch('./src/**/*.js', ['compile'])

gulp.task("compile", function () {
    console.log('compile---------------------')
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest("lib"));
});

gulp.task('dev', ['clean', 'compile'], (e) => {
    console.log('dev')
    nodemon({
        script: 'src/app.js',
        ext: 'js',
        env: require('./env/dev.json'),
        ignore: ['./node_modules/**'],
        delay: 3,
        verbose: true
    }).on('start', () => {
        started || (started = !0, e());
    });
});


gulp.task('stage', ['clean', 'compile'], (e) => {
    nodemon({
        script: 'src/app.js',
        ext: 'js',
        env: require('./env/stage.json'),
        ignore: ['./node_modules/**']
    }).on('start', () => {
        started || (started = !0, e());
    });
});



gulp.task('prod', ['clean', 'compile'], (e) => {
    nodemon({
        script: 'src/app.js',
        ext: 'js',
        env: require('./env/prod.json'),
        ignore: ['./node_modules/**'],
    }).on('start', () => {
        started || (started = !0, e());
    });
});


let clean = require('gulp-rimraf');
gulp.task('clean', [], function () {
    console.log("Clean all files in build folder");
    return gulp.src("dist/").pipe(clean());
});
