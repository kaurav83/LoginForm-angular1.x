var gulp = require('gulp');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gulpIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var babelify = require('babelify');
var ngAnnotate = require('browserify-ngannotate');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var reload = browserSync.reload;

var jsFiles = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";
var scssFiles = "src/scss/**/**.**";
var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

var interceptErrors = function (error) {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
};

gulp.task('styles', ['views'], function () {
  return gulp.src('./src/scss/style.scss')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Styles',
          message: err.message
        }
      })
    }))
    // .pipe(concat('style.css'))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: [
        'last 2 versions',
        'ie 8',
        'ie 9',
        'android 2.3',
        'Android >= 4',
        'opera 12',
        'Firefox ESR'
      ]
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('./build/'))
    .pipe(reload({
      stream: true
    }))

});

gulp.task('browserify', ['views'], function () {
  return browserify('./src/js/app.js')
    .transform(babelify, {
      presets: ["es2015"]
    })
    .transform(ngAnnotate)
    .bundle()
    .on('error', interceptErrors)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('html', function () {
  return gulp.src("src/index.html")
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/'));
});

gulp.task('fonts', function() {
  return gulp.src("src/fonts/**/*")
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('views', function () {
  return gulp.src(viewFiles)
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename("app.templates.js"))
    .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('build', ['html', 'browserify'], function () {
  var html = gulp.src("build/index.html")
    .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));

  var css = gulp.src("build/style.css")
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));

  var buildFonts = gulp.src(
      'build/fonts/**/*'
    )
    .pipe(gulp.dest('dist/'))

  return merge(html, js, css, buildFonts);
});

gulp.task('default', ['styles', 'html', 'browserify', 'fonts'], function () {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    }
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch(scssFiles, ['styles']);
});
