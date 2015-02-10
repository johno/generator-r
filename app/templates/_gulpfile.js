var gulp = require('gulp');
var rename = require('gulp-rename');
var cssmin = require('gulp-minify-css');
var prefix = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('browserify', function() {
  var browserified = transform(function(filename) {
    var b = browserified(filename);
    return b.bundle();
  });

  gulp.src('src/**/*.js')
    .pipe(browserified)
    .pipe(rename('j.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('uglify', ['browserify'], function() {
  gulp.src('dist/j.js')
    .pipe(uglify())
    .pipe(rename({ suffix: 'min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  gulp.src('src/css/all.css')
    .pipe(prefix())
    .pipe(cssmin())
    .pipe(rename('c.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['browserify', 'uglify'])
});

gulp.task('default', ['browserify', 'uglify', 'css']);
