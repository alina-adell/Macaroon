'use strict';

const plumber = require('gulp-plumber');
const less = require('gulp-less');
// const path = require('path');
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');
const browserSync = require('browser-sync');
const reload      = browserSync.reload;

gulp.task('less', function() {
    return  gulp.src('./css/**/*.less')
        .pipe(less())
        .pipe(concatCss("styles/bundle.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
     browserSync.init({
            server: {
                baseDir: "./" // папка для локального сервера
            },
            notify: false
        });
    gulp.watch('./css/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'browser-sync'));
