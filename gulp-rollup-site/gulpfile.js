import gulp from 'gulp';
const { task, dest, src, watch, series, parallel } = gulp;
// declare the cache variable outside of task scopes
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';

// declare the cache variable outside of task scopes
let cache;

// ========================================
// Dev Mode
// ========================================

// SERVER =================================
import bs from 'browser-sync';
const browserSync = bs.create();

// https://browsersync.io/docs/gulp
task('server', (done) => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    open: false,
    port: 8080,
  });
  done();
});

task('reload', (done) => {
  browserSync.reload();
  done();
});

// JS ==================================

import rollupStream from '@rollup/stream';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonJs from '@rollup/plugin-commonjs';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

task('js', () => {
  const sourceFile = './dev/assets/js/main.js';
  const targetFolder = './assets/js';

  return rollupStream({
    input: sourceFile,
    output: {
      format: 'iife',
      sourcemap: true,
    },
    // define the cache in Rollup options
    cache,
    plugins: [
      nodeResolve(),
      commonJs({
        include: 'node_modules/**',
      }),
      babel({ babelHelpers: 'bundled' }),
    ],
  })
    .on('bundle', (bundle) => {
      // update the cache after every new bundle is created
      cache = bundle;
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('../map'))
    .pipe(dest(targetFolder));
});

// CSS ==================================

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoPrefixer from 'gulp-autoprefixer';

const sass = gulpSass(dartSass);
task('css', (done) => {
  const sourceFile = './dev/assets/scss/main.scss';
  const targetFolder = './assets/css';

  src(sourceFile)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
        sourceMap: false,
        debug: true,
      }).on('error', sass.logError)
    )
    .pipe(autoPrefixer())
    .pipe(sourcemaps.write('../map'))
    .pipe(dest(targetFolder));

  done();
});

// FONTS =================================
task('fonts', (done) => {
  const sourceFiles = ['./dev/assets/fonts/**/*.+(woff|woff2)', './dev/assets/fonts/*.+(woff|woff2)'];
  const targetFolder = './assets/fonts';

  return src(sourceFiles, { allowEmpty: true }).pipe(dest(targetFolder));

  done();
});

// HTML =================================
import fileInclude from 'gulp-file-include';
task('html', (done) => {
  const sourceFiles = ['./dev/html/pages/**/*.html', './dev/html/pages/*.html'];
  const targetFolder = './';

  gulp
    .src(sourceFiles)
    .pipe(plumber())
    .pipe(
      fileInclude({
        prefix: '@@',
        basepath: './dev/html/includes',
      })
    )
    .pipe(dest(targetFolder));

  done();
});

// Watcher ===============================

task('watcher', () => {
  watch(['./dev/assets/js/**/*.js', './dev/assets/js/*.js'], series('js', 'reload'));

  watch(['./dev/assets/scss/**/*.scss', './dev/assets/scss/*.scss'], series('css', 'reload'));

  watch(['./dev/assets/fonts/**/*.+(woff2|woff|eot|ttf|svg)', './dev/assets/fonts/*.+(woff2|woff|eot|ttf|svg)'], series('fonts', 'reload'));

  watch(
    ['./dev/html/pages/**/*.html', './dev/html/pages/*.html', './dev/html/includes/**/*.html', './dev/html/includes/*.html'],
    series('html', 'reload')
  );
});

// ======================================
// Build Mode
// ======================================

// CLEANER ==============================
import del from 'del';

task('clean', (done) => {
  const deleteFolder = ['./dist'];
  return del(deleteFolder);
});

// COPY =================================
task('copy', (done) => {
  const sourceFiles = [
    './**',
    '.htaccess',
    '!./MATERIAL',
    '!./MATERIAL/**',
    '!./dev/**',
    '!./dev',
    '!.browserslistrc',
    '!package-lock.json',
    '!package.json',
    '!.gitignore',
    '!README.md',
    '!.DS_STORE',
    '!./gulp/**',
    '!./gulp',
    '!gulpfile.js',
    '!./node_modules/**',
    '!./node_modules',
    '!composer.json',
    '!composer.lock',
  ];
  const targetFolder = './dist';

  return src(sourceFiles, { allowEmpty: true }).pipe(dest(targetFolder));

  done();
});

// COMPRESS JS ==========================
import terser from 'gulp-terser';
task('compress:js', (done) => {
  const sourceFile = './dist/assets/js/bundle.js';
  const targetFolder = './dist/assets/js';

  src(sourceFile)
    .pipe(terser())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest(targetFolder));
  done();
});

// COMPRESS CSS ==========================
import cleanCss from 'gulp-clean-css';

task('compress:css', (done) => {
  const sourceFile = './dist/assets/css/main.css';
  const targetFolder = './dist/assets/css';

  src(sourceFile)
    .pipe(
      cleanCss({
        compatibility: 'ie10',
      })
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(dest(targetFolder));
  done();
});

// REPLACE IN FILES ====================================
import replace from 'gulp-replace';
import crypto from 'crypto';

task('replaceString', (done) => {
  const id = crypto.randomBytes(12).toString('base64');
  return src(['./dist/*.html'])
    .pipe(replace('js/bundle.js', 'js/bundle.min.js?r=' + id))
    .pipe(replace('css/main.css', 'css/main.min.css?r=' + id))
    .pipe(dest('./dist'));
  done();
});

// COMPRESS HTML =====================================
import htmlmin from 'gulp-html-minifier-terser';
task('compress:html', (done) => {
  const sourceFiles = ['./dist/**/*.html', './dist/*.html'];
  const targetFolder = './dist';

  gulp
    .src(sourceFiles)
    .pipe(plumber())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(targetFolder));

  done();
});

// SIZE REPORT ==========================================
import sizeReport from 'gulp-sizereport';
task('size', (done) => {
  const sourceFiles = ['./dist/**/*.html', './dev/*.html', './dist/**/*.min.js', './dev/*.min.js', './dist/**/*.min.css', './dev/*.min.css'];

  src(sourceFiles).pipe(sizeReport());

  done();
});

// DEV MODE ===========================================
task('serve', series('html', 'css', 'js', 'fonts', parallel('watcher', 'server')));

// BUILD MODE =========================================
task('build', series('clean', 'copy', 'compress:js', 'compress:css', 'replaceString', 'compress:html', 'size'));
