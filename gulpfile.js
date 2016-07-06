
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefix = require('gulp-autoprefixer'),
    ts = require('gulp-typescript');

gulp.task('ts', function() {

  return gulp.src('public/ts/*.ts')
    .pipe(ts({
      out: 'app.js'      
    }))
    .pipe(gulp.dest('public/src/js/'))

});

gulp.task('login-ts', function() {

  return gulp.src('public/ts/client/login.ts')
    .pipe(ts({
      out: 'login.js'      
    }))
    .pipe(gulp.dest('public/src/js/'))

});

gulp.task('sass', function() {

  return gulp.src('public/sass/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/src/css/'));

});

gulp.task('autoprefix-css', function() {

  return gulp.src('public/src/css/style.css')
    .pipe(prefix('last 2 version'));

});

gulp.task('watch', function() {

  gulp.watch('public/ts/client/login.ts', ['login-ts']);
  gulp.watch('public/ts/**/*.ts', ['ts']);
  gulp.watch('public/sass/*.sass', ['sass']);
  gulp.watch('public/src/css/*.css', ['autoprefix-css']);
  gulp.watch('public/sass/main.sass', ['default']);

});

gulp.task('default', ['login-ts', 'ts', 'sass', 'autoprefix-css', 'watch']);
