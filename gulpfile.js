var gulp = require("gulp");
var sass = require("gulp-sass");
var htmlmin = require("gulp-htmlmin");
var del = require('del');
var notify = require("gulp-notify");

/*
	
	Task responsável por compilar todos os arquivos no formato .scss e .sass e 
	retomar para pasta css que será criada automaticamente.

*/

gulp.task("compila-css", function(){
	
	return gulp.src('./source/scss/style.scss')
		   .pipe(sass({outputStyke: 'compressed'}))
		   .on("error", notify.onError({title:"Erro ao Compilar", message:"<%= error.message %>"}))
		   .pipe(gulp.dest('./dist/css'));
});

/*
	
	Task responsável por minificar todos os arquivos no formato .html  e 
	retomar para pasta dist que será criada automaticamente.

*/

gulp.task('minifica-html', function(){

	return gulp.src('./source/*.html')
		   .pipe(htmlmin({collapseWhitespace: true}))
		   .pipe(gulp.dest('dist'));
});

/*
	
	Task responsável por deletar todos os arquivos no formato .css  e 
	retomar para pasta dist que será criada automaticamente.

*/

gulp.task('del-dist-css', function(){
	del('./dist/css');
});

gulp.task('background', ['del-dist-css'], function() {
	gulp.start(
		'compila-css', 'minifica-html'
	);
	gulp.watch('./source/scss/*.scss',['compila-css']);
	gulp.watch('./source/*.html', ['minifica-html']);
});

