// ---------------------------------------
// CONFIGURATION GULPFILE.JS
// ---------------------------------------

let gulp          = require('gulp');
let browserSync   = require('browser-sync').create();
let plumber       = require("gulp-plumber");
let sass          = require('gulp-sass');
let prefix        = require("gulp-autoprefixer");
let concat        = require('gulp-concat');
let notify        = require("gulp-notify");

var onError = function(err){
	console.log("Se ha producido un error: ", err.message);
	this.emit("end");
}

// ---------------------------------------
// TAREA SASS - CSS
// ---------------------------------------

//gulp.task('sass', () => {
gulp.task("sass", function(){
	return gulp.src(['assets/sass/main.sass'])
	.pipe(plumber({errorHandler:onError}))
	.pipe(sass({outputStyle: 'expanded'}))
	.pipe(prefix("last 2 versions"))
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.stream())
	.pipe(notify({message: "SASS tarea finalizada 💯"}))
});

// ---------------------------------------
// RUTA DEL DIRECTORIO
// ---------------------------------------

var path = require('path');
var name_project = path.dirname(__filename).split(path.sep)[4]

// ---------------------------------------
// TAREA BROWSERSYNC
// ---------------------------------------

gulp.task('browsersync', () => {
	var files = ['../**/'];
	browserSync.init(files,{
		open:  'external',
		host:  'kode.wp',
		proxy: 'kode.wp/'+name_project,
		port:  '8080',
		browser: 'chrome',
		notify: false
	});
});

// ---------------------------------------
// TAREA WATCH
// ---------------------------------------

gulp.task("watch", function(){
    gulp.watch('./assets/sass/**/*.sass', gulp.series('sass'));
});

// ---------------------------------------
// EJECUTAR TAREAS
// ---------------------------------------

gulp.task('default', gulp.parallel('sass', 'browsersync', 'watch'));