/**
 * Created by flywood on 18.03.17.
 */

var gulp = require('gulp');
const shell = require('gulp-shell')

gulp.task('default', shell.task('ng serve --open true'))
