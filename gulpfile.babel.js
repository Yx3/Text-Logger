//Include required modules
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import nodemon from 'gulp-nodemon';
import rimraf from 'rimraf';
import sourcemaps from 'gulp-sourcemaps';
import unitest from 'unitest';
import image from 'gulp-image';

//Default task. This will be run when no task is passed in arguments to gulp
gulp.task('default', ['start']);

gulp.task('build:static', ['clean'], () =>
  gulp.src('./src/app/**/*.html').pipe(gulp.dest('./dist/app'))
);

gulp.task('image', ['clean'], () =>
  gulp.src('./src/static/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/app'))
);

//Convert ES6 code in all js files in src/js folder and copy to
//build folder as bundle.js
gulp.task('build', ['build:static', 'image'], () => compileNodeJS('src/**/*.js', './dist'));

gulp.task('build:test', ['clean:test'], () => compileNodeJS('src/**/*.js', './dist-test'));

gulp.task('clean:test', () => rimraf.sync('./dist-test'));

gulp.task('clean', () => {
  rimraf.sync('./dist');
  rimraf.sync('./TextLogger*');
});

gulp.task('run:eslint', () => gulp.src('src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.results(lintReporter))
  .pipe(eslint.failAfterError())
);

gulp.task('run:test', ['build:test'], () => {
  const output = unitest({
    browser: 'dist-test/test/browser/index.js',
    node: 'dist-test/test/node/index.js',
    report: ['text']
  }, (exitCode) => {
    if (exitCode !== 0) {
      console.error('Tests failed! - Test script exited with non-zero status code.');
    }
    return true;
  });
  output.pipe(process.stdout);
});

gulp.task('lint', ['run:eslint']);
gulp.task('test', ['lint', 'run:test']);

gulp.task('start', ['build'], () => {
  nodemon({
    script: 'index.js',
    watch: 'src',
    tasks: ['build'],
    env: {'NODE_ENV': 'production'}
  })
});

// Compile js to be run in node and dependent sources using babel
// with options specified
// in ./babelrc and place them in dest. Works for server and test js.
const compileNodeJS = (src, dest) =>
  gulp.src(src)
    .pipe(changed(dest))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write({
      includeContent: false,
      sourceRoot: (file) => file.base
    }))
    .pipe(gulp.dest(dest));


const lintReporter = (results) => {
  const logColor = results.errorCount ? gutil.colors.red : gutil.colors.green;
  gutil.log('Total Results: ' + results.length);
  gutil.log('Total Warnings: ' + results.warningCount);
  gutil.log(logColor('Total Errors: ' + results.errorCount));
};
