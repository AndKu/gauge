var gulp           = require('gulp'),
    autoprefixer   = require('gulp-autoprefixer'),
    browserSync    = require('browser-sync'),
    reload         = browserSync.reload,
    rename         = require('gulp-rename'),
    uglify         = require('gulp-uglify'),
    watch          = require('gulp-watch');

var path = {
    build: 'build/',
    src : {
        css: 'src/*.css',
        js: 'src/*.js',
        html: 'src/*.html'
    }
};

var config = {
    server: {
        baseDir: "./build"
    }
    ,
    // tunnel: true,
    // host: 'localhost',
    // port: 9000,
    // logPrefix: "Frontend",
    // reloadDelay: 1000
};

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
var onError = function (err) {
  console.log(err);
 };
gulp.task('styles:build', function () {
    return gulp.src(path.src.css)
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest(path.build));
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js)
        .pipe(uglify().on('error', onError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build));
});

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build));
});

gulp.task('styles:watch', ['styles:build'], reload);
gulp.task('js:watch', ['js:build'], reload);
gulp.task('html:watch', ['html:build'], reload);

gulp.task('watch', function() {
  gulp.watch(path.src.css, ['styles:watch']);
  gulp.watch(path.src.js, ['js:watch']);
  gulp.watch(path.src.html, ['html:watch']);
});

gulp.task('defaultBuild', ['styles:build', 'js:build', 'html:build', 'watch']);

gulp.task('runServer',['defaultBuild'], function () {
    browserSync.init(config);
});

gulp.task('default', ['runServer'] );
