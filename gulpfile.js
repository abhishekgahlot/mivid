/* jshint node:true */
"use strict";
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserify = require('gulp-browserify');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

gulp.task('browserify', function() {
	gulp.src('client/client.js')
		.pipe(plumber())
		.pipe(browserify({transform: 'reactify', debug: true}))
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(concat('client.js'))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function() {
	gulp.watch('client/**/*.*', ['browserify']);
});
