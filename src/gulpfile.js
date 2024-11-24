const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps'); 
const path = require('path');

// Task to delete the dist folder
gulp.task('clean', async function () {
    const del = await import('del');
    return del.deleteSync(['dist']);
});

gulp.task('clean-js', async function () {
    const del = await import('del');
    return del.deleteSync(['dist/js']);
});


gulp.task('clean-styles', async function () {
    const del = await import('del');
    return del.deleteSync(['dist/css']);
});

// Task to minify and combine JavaScript files in the 'js/pages' folder into 'scripts.min.js'
gulp.task('minify-js-pages', function () {
    return gulp.src('js/pages/**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

// Task to minify and copy other JavaScript folders while removing duplicate folders
gulp.task('minify-js-others', function () {
    return gulp.src(['js/**/*.js', '!js/pages/**/*.js'])
        .pipe(uglify())
        .pipe(rename(function(filePath) {
            // Get the directory parts
            const dirs = filePath.dirname.split('/');
            
            // Remove consecutive duplicate folders
            const uniqueDirs = dirs.filter((dir, index) => dir !== dirs[index + 1]);
            
            // Update the dirname with deduplicated path
            filePath.dirname = uniqueDirs.join('/');
            
            return filePath;
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
});

// Task to compile Sass and minify CSS files
gulp.task('minify-css', function () {
    return gulp.src('sass/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('styles', gulp.series('clean-styles', 'minify-css'));

gulp.task('js', gulp.series('clean-js', 'minify-js-pages', 'minify-js-others'));
// Default task
gulp.task('default', gulp.series('clean', 'minify-js-pages', 'minify-js-others', 'minify-css'));