var gulp = require('gulp');
var browserify = require('gulp-browserify');
var minifyCSS = require('gulp-minify-css');
var htmlmin = require('gulp-html-minifier');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');

var paths = {
  scripts: 'app/assets/js/**/*.js',
  stylesheets : 'app/assets/css/**/*.css',
  templates : 'app/assets/templates/**/*.html'
};

var distPaths = {
    scripts : 'public/dist/js',
    stylesheets: 'public/dist/css',
    templates : 'public/dist/templates'
};

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.stylesheets, ['stylesheets']);
  gulp.watch(paths.templates, ['templates']);
});

gulp.task('scripts', ['clean-dist-scripts'], function() {

    gulp.src('app/assets/js/index.js')
        .pipe(plumber())
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest(distPaths.scripts));

    gulp.src('app/assets/js/login.js')
        .pipe(plumber())
        .pipe(browserify({
          insertGlobals : true
        }))
        .pipe(gulp.dest(distPaths.scripts));
});

gulp.task('stylesheets', ['clean-dist-stylesheets'], function (){
    return gulp.src(paths.stylesheets)
      .pipe(plumber())
      .pipe(minifyCSS({
          keepBreaks:true
      }))
      .pipe(gulp.dest(distPaths.stylesheets));
});

gulp.task('templates', ['clean-dist-templates'],function() {
  return gulp.src(paths.templates)
    .pipe(plumber())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(distPaths.templates));
});

gulp.task('clean-dist', ['clean-dist-scripts', 'clean-dist-stylesheets', 'clean-dist-templates']);

gulp.task('clean-dist-scripts', function (){
    return gulp.src('public/dist/js', {
                read: false
            })
            .pipe(clean());
});

gulp.task('clean-dist-stylesheets', function (){
    return gulp.src('public/dist/css', {
                read: false
            })
            .pipe(clean());
});

gulp.task('clean-dist-templates', function (){
    return gulp.src('public/dist/templates', {
                read: false
            })
            .pipe(clean());
});

gulp.task('default', ['clean-dist', 'scripts', 'stylesheets', 'templates', 'watch']);
