var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');

var src  = 'public/src';
var dist = 'public/dist';

var paths = {
	js: src + '/js/*.js',
	scss: src + '/scss/*.scss',
	html: src + '/**/*.html'
};

gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver());
});

gulp.task('combine-js', function () {
	return gulp.src(paths.js)
		.pipe(concat('app.js'))
		.pipe(uglify().on('error', gutil.log))
		.pipe(gulp.dest(dist + '/js'));
});

gulp.task('compile-sass', function () {
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(dist + '/css'));
});

gulp.task('compress-html', function () {
	return gulp.src(paths.html)
		.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ['combine-js']);
	gulp.watch(paths.scss, ['compile-sass']);
	gulp.watch(paths.html, ['compress-html']);
	gulp.watch(dist + '/**').on('change', livereload.changed);
});

gulp.task('open', function () {
    var options = {
        url: "http://localhost:8000/html/index.html",
        app: 'chrome'
    };
    gulp.src(buildSrc + "/")
        .pipe(open(options));
});

gulp.task('default', [
	'server', 'combine-js', 
	'compile-sass', 'compress-html', 
	'watch' 
]);

gulp.task('lint', function() {
  return gulp.src(['**/*.{js,jsx}','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});