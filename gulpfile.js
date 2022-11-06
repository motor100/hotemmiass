let preprocessor = 'sass', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
		fileswatch   = 'html,htm,txt,json,md,woff2' // List of files extensions for watching & hard reload

const gulp         = require('gulp')
const { src, dest, parallel, series, watch } = require('gulp')
const browserSync  = require('browser-sync').create()
const webpack      = require('webpack-stream')
const sass         = require('gulp-sass')(require('sass'))
const sassglob     = require('gulp-sass-glob')
const stylglob     = require("gulp-noop")
const cleanCSS     = require('gulp-clean-css')
const concat       = require('gulp-concat')
const uglify       = require('gulp-uglify-es').default
const autoprefixer = require('gulp-autoprefixer')
const rename       = require('gulp-rename')
const imagemin     = require('gulp-imagemin')
const imgCompress  = require('imagemin-jpeg-recompress') // Добавил
const newer        = require('gulp-newer')
const rsync        = require('gulp-rsync')
const del          = require('del')

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done() };

gulp.task('styles', function () {
	return gulp.src('app/sass/**/*')
	.pipe(sass({
		outputStyle: 'expanded',
		includePaths: require('bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
		// grid: true, // Optional. Enable CSS Grid
		overrideBrowserslist: ['last 10 versions']
	}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'app/js/app.js',
		])
		.pipe(concat('app.min.js'))
		.pipe(uglify()) //Minify app.min.js
		.pipe(gulp.dest('app/js/'))
		.pipe(browserSync.reload({ stream: true }));
});

gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('images', function(done) {
  gulp.src('app/images/src/**')
    .pipe(imagemin())
    // .pipe(imagemin([
    //   imgCompress({
    //     loops: 4,
    //     min: 70,
    //     max: 80,
    //     quality: 'high'
    //   }),
    //   imagemin.gifsicle(),
    //   imagemin.optipng(),
    //   imagemin.svgo()
    // ]))
    .pipe(gulp.dest('app/images/dist'))
  done()
});

gulp.task('watch', function () {
	gulp.watch('app/sass/**/*', gulp.parallel('styles'));
	gulp.watch('app/images/src/**', { events: 'all' }, gulp.parallel('images'));
	gulp.watch(['app/js/app.js', 'app/libs/**/*.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'images', 'browser-sync', 'watch'));
