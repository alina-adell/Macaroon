'use strict';

const plumber = require('gulp-plumber');
const less = require('gulp-less');
// const path = require('path');
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');

async function toless() {
    await gulp.src('./css/**/*.less')
        .pipe(less())
        .pipe(concatCss("styles/bundle.css"))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('dist/'));
}

exports.toless = toless;
exports.default = toless;