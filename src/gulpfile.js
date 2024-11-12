const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Load gulp-sass with Dart Sass
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const path = require('path');


// Task to delete the dist folder
gulp.task('clean', async function () {
    const del = await import('del');
    return del.deleteSync(['dist']);
});

// Task to minify and combine JavaScript files in the 'js/pages' folder into 'scripts.min.js'
gulp.task('minify-js-pages', function () {
    return gulp.src('js/pages/**/*.js')
        .pipe(concat('scripts.min.js')) // Combine into one file
        .pipe(uglify()) // Minify the JavaScript
        .pipe(gulp.dest('dist/js')); // Save as 'scripts.min.js' in 'dist/js'
});

// Task to minify and copy other JavaScript folders while keeping their structure
gulp.task('minify-js-others', function () {
    return gulp.src(['js/**/*.js', '!js/pages/**/*.js']) // Exclude 'js/pages' from this task
        .pipe(uglify()) // Minify each file
        .pipe(rename({ extname: '.min.js' })) // Rename to .min.js
        .pipe(gulp.dest(function (file) {
            // Remove the top-level 'js' folder from the destination path
            const relativePath = path.relative('js', file.path); // Get the path relative to 'js'
            return path.join('dist/js', path.dirname(relativePath)); // Join with 'dist/js'
        }));
});

// Task to compile Sass and minify CSS files
gulp.task('minify-css', function () {
    return gulp.src('sass/styles.scss') // Path to your Sass files
        .pipe(sass().on('error', sass.logError)) // Compile Sass to CSS
        .pipe(cleanCSS()) // Minify the compiled CSS
        .pipe(rename('styles.min.css')) // Rename to .min.css
        .pipe(gulp.dest('dist/css')); // Destination for minified CSS files
});

// Default task (optional)
gulp.task('default', gulp.series('clean', 'minify-js-pages', 'minify-js-others', 'minify-css'));
