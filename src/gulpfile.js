const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Load gulp-sass with Dart Sass
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Task to minify JavaScript files
gulp.task('minify-js', function () {
    return gulp.src('js/pages/**/*.js') // Path to your JavaScript files
        .pipe(concat('all.min.js'))
        .pipe(uglify()) // Minify the JavaScript files
        .pipe(rename({ extname: '.min.js' })) // Rename to .min.js
        .pipe(gulp.dest('dist/js')); // Destination for minified files
});

// Task to compile Sass and minify CSS files
gulp.task('minify-css', function () {
    return gulp.src('sass/styles.scss') // Path to your Sass files
        .pipe(sass().on('error', sass.logError)) // Compile Sass to CSS
        .pipe(cleanCSS()) // Minify the compiled CSS
        .pipe(rename('style.min.css')) // Rename to .min.css
        .pipe(gulp.dest('dist/css')); // Destination for minified CSS files
});

// Default task (optional)
gulp.task('default', gulp.series('minify-js', 'minify-css'));
