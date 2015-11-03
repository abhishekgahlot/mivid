"use strict";
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
	gulp.src('client/client.js')
		.pipe(plumber())
		.pipe(browserify({transform: 'reactify', debug: true}))
		.pipe(concat('client.js'))
		.pipe(gulp.dest('public'));
});

gulp.task('default', ['browserify']);

gulp.task('watch', function() {
	gulp.watch('src/**/*.*', ['browserify']);
});
