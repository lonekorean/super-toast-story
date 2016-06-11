var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	jshint = require('gulp-jshint'),
	jshintStylish = require('jshint-stylish');

// file paths
var sources = {
	'client': {
		'static': ['./client/**/*.{html,gif,jpg,png}'],
		'css': ['./client/**/*.scss'],
		'js': ['./client/**/*.js']
	},
	'config': {
		'js': ['gulpfile.js', 'package.json']
	}
};

// prefer jshint config here rather than hidden file
var jshintConfig = {
	'lookup': false,
	'globals': {
		'define': false
	}
};

// front-end static stuff
gulp.task('client-static', function() {
	gulp.src(sources.client.static)
		.pipe(gulp.dest('./dist'));
});

// front-end css stuff
gulp.task('client-css', function() {
	gulp.src(sources.client.css)
		.pipe(sass({ errLogToConsole: true }))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./dist'));
});

// front-end javascript
gulp.task('client-js', function() {
	gulp.src(sources.client.js)
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter(jshintStylish))
		.pipe(gulp.dest('./dist'));
});

// configuration javascript
gulp.task('config-js', function() {
	gulp.src(sources.config.js)
		.pipe(jshint(jshintConfig))
		.pipe(jshint.reporter(jshintStylish));
});

// build site
gulp.task('default', ['client-static', 'client-css', 'client-js', 'config-js']);

// build site and watch for changes
gulp.task('watch', ['default'], function() {
	gulp.watch(sources.client.static, ['client-static']);
	gulp.watch(sources.client.css, ['client-css']);
	gulp.watch(sources.client.js, ['client-js']);
	gulp.watch(sources.config.js, ['config-js']);
});
