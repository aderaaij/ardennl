var browserSync   = require('browser-sync')
var gulp          = require('gulp')
var plugins       = require('gulp-load-plugins')()
var config        = require('../config/scripts')
var errorHandler  = require('../lib/errorHandler');

gulp.task('scripts', function(cb) {
  return gulp.src(config.source)

  // Initialize sourcemap function
  .pipe(plugins.sourcemaps.init())

  // Concatinate in one file
  .pipe(plugins.concat(config.concat))

  // Catch errors
  .on('error', errorHandler)

  // Add a .min version
  .pipe(plugins.rename(config.rename))

  // Minify with jsUglify
  .pipe(plugins.uglify())

  // Catch errors
  .on('error', errorHandler)

  // Write out sourcemap
  .pipe(plugins.sourcemaps.write('./'))

  // Distribute to build
  .pipe(gulp.dest(config.dest))

  // Livereload
  .pipe(browserSync.stream())

  // Show notifcation
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Scripts task complete' })));
});

gulp.task('scripts:production', function(cb) {
  return gulp.src(config.source)

  // Concatinate in one file
  .pipe(plugins.concat(config.concat))

  // Catch errors
  .on('error', errorHandler)

  // Add a .min version
  .pipe(plugins.rename(config.rename))

  // Minify with jsUglify
  .pipe(plugins.uglify())

  // Catch errors
  .on('error', errorHandler)

  .pipe(plugins.sourcemaps.write('./'))

  // Distribute to build
  .pipe(gulp.dest(config.dest))

  // Show notifcation
  .pipe(plugins.if(global.isWatching, plugins.notify({ message: 'Scripts task complete' })));
});