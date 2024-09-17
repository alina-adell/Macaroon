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
const del = require('del');

gulp.task('less', function() {
    return gulp.src('./css/*.less', { base: './' })
        .pipe(less())
        .pipe(concatCss("styles/bundle.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});
gulp.task('fonts', function () {
    return gulp.src('./fonts/*')
        .pipe(gulp.dest('dist/fonts'))
        .pipe(browserSync.stream());
});
gulp.task('images', function () {
    return gulp.src('./images/*')
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});
gulp.task('scripts', function () {
    return gulp.src('./scripts/*')
        .pipe(gulp.dest('dist/scripts'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
     browserSync.init({
            server: {
                baseDir: "dist" // папка для локального сервера
            },
            notify: false
        });
    gulp.watch('./css/*.less', gulp.series('less'))
    gulp.watch('./*.html', gulp.series('html'))
    gulp.watch('./fonts/*', gulp.series('fonts'))
    gulp.watch('./images/*', gulp.series('images'))
    gulp.watch('./scripts/*', gulp.series('scripts'));
});

gulp.task('clean', function () {
    return del('dist')
});



gulp.task('default', gulp.series('clean','less', 'html', 'fonts', 'images', 'scripts', 'browser-sync'));
