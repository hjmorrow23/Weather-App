var gulp = require("gulp");

var plugins = require('gulp-load-plugins')();

var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('src/scss/style.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('autoprefixer', function () {
    return gulp.src('./src/*.css')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.postcss([ plugins.autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dest'));
});

gulp.task('scripts', function() {
  return gulp.src('./lib/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function (cb) {
  plugins.pump([
        gulp.src('lib/*.js'),
        plugins.uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});