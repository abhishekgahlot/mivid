"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var babel = require('gulp-babel');

gulp.task('browserify', function() {
	gulp.src('client/client.js')
		.pipe(plumber())
		.pipe(browserify({debug: true}))
		.pipe(babel({
			presets: ['es2015', 'react']
		}))
		.pipe(concat('client.js'))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.*', ['browserify']);
});
