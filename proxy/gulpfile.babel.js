import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', () => (
  gulp.src([
    'client/**/*.js',
    'server/**/*.js',
    'gulpfile.babel.js',
    'webpack.config.js',
    '!node_modules/**']
  )
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('precommit', ['lint']);
