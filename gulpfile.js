// Gulp plugin setup
var gulp = require('gulp')

var sass = require('gulp-sass') // Compiles SASS
var autoprefixer = require('gulp-autoprefixer')
var notify = require('gulp-notify') // notifies of errors
var neat = require('node-neat').includePaths // includes the bourban-neat libraries
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var replace = require('gulp-replace') // Added variable for gulp-replace
var babelify = require('babelify')
var minify = require('gulp-babel-minify')
var minifyCSS = require('gulp-cssnano')
var strip = require('gulp-strip-comments')
var rename = require('gulp-rename')

gulp.task('sass', function () {
    gulp.src('./sass/*.{sass,scss}')
        .pipe(sass({
            includePaths: neat
        }))
        .on('error', handleErrors)
        .pipe(autoprefixer({
            browsers: ['last 2 version']
        }))
        .pipe(gulp.dest('./'))
})


gulp.task('browserify', function () {
    var bundler = browserify('./js/canvasChart.js')
    bundler.transform(babelify)

    bundler.bundle()
        .on('error', handleErrors)
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('canvasChart.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'))
})

gulp.task('browserifyAnimations', function () {
    var bundler = browserify('./js/scrollAnimations.js')
    bundler.transform(babelify)
    bundler.bundle()
        .on('error', handleErrors)
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('scrollAnimations.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./'))
})


gulp.task('minify', function () {

    gulp.src('./Timber/assets/bundle.js')
        .pipe(strip())
        .pipe(minify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./Timber/assets'))

        .on('error', handleErrors)
    console.log('Minified main js')

    gulp.src('./scrollAnimations.js')
        .pipe(strip())
        .pipe(minify())
        .pipe(rename('customizer-bundle.min.js'))
        .pipe(gulp.dest('./Timber/assets'))
    console.log('Minified customizer')


    gulp.src('./Timber/assets/styles.css')
        .pipe(minifyCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('./Timber/assets'))
    console.log('Complete CSS Minification')


})

gulp.task('deploy', ['browserify', 'browserifyAnimations', 'sass'])


function handleErrors() {
    var args = Array.prototype.slice.call(arguments)

    // Send error to notification center with gulp-notify
    notify.onError({
        title: 'Compile Error',
        message: '<%= error %>'
    }).apply(this, args)

    // Keep gulp from hanging on this task
    this.emit('end')
}