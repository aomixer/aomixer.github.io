const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const ejs = require('gulp-ejs');
const ejsSrc = ['_src/ejs/**/*.ejs', '!' + '_src/ejs/**/_*.ejs'];
const flexBugsFixes = require('postcss-flexbugs-fixes');
const gulp = require('gulp');
const header = require('gulp-header');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackStream = require('webpack-stream');

const distPath = './docs/assets';
const path = {
  root: './_src',
  html: {
    src: './docs/**/*.html',
    dest: './docs/',
  },
  styles: {
    src: './_src/scss/**/*.scss',
    dest: distPath + '/css/',
    map: distPath + '/css/maps',
  },
  scripts: {
    src: './_src/js/**/*.js',
    dest: distPath + '/js/',
    map: distPath + '/js/maps',
  },
  ejs: {
    src: '_src/ejs/**/*.ejs',
    dest: './docs/',
  },
  images: {
    src: './_src/img/**/*.{jpg,jpeg,png,svg,gif}',
    dest: distPath + '/img/',
  },
};

const autoprefixerOption = {
  grid: true,
};

const postcssOption = [autoprefixer(autoprefixerOption), flexBugsFixes];

function sassCompress() {
  return gulp
    .src(path.styles.src, { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'sass',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(
      sass({
        outputStyle: 'compressed',
      })
    )
    .pipe(postcss(postcssOption))
    .pipe(replace(/@charset "UTF-8";/g, ''))
    .pipe(header('@charset "UTF-8";\n\n'))
    .pipe(gulp.dest(path.styles.dest, { sourcemaps: './map' }));
}

const imageminOption = [
  pngquant({
    quality: [0.8, 0.9],
  }),
  mozjpeg({
    quality: 90,
  }),
  imagemin.gifsicle(),
  imagemin.mozjpeg(),
  imagemin.optipng(),
  imagemin.svgo({
    plugins: [{ removeViewBox: false }],
  }),
];

function images() {
  return gulp.src(path.images.src).pipe(imagemin(imageminOption)).pipe(gulp.dest(path.images.dest));
}

function webps() {
  return gulp
    .src(path.images.src)
    .pipe(
      webp({
        quality: 85,
        method: 6,
      })
    )
    .pipe(gulp.dest(path.images.dest));
}

function ejsCompile() {
  return gulp
    .src(ejsSrc)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'ejs',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(ejs())
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(path.ejs.dest));
}

function esTranspile() {
  return gulp
    .src(path.scripts.src)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'js',
          message: 'Error: <%= error.message %>',
        }),
      })
    )
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(path.scripts.dest));
}

function mapClean() {
  return del([distPath + '/css/map/', distPath + '/js/script.js.map']);
}

function buildClean() {
  return del(distPath);
}

const browsersync = (done) => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: './docs/',
      index: 'index.html',
    },
    open: 'external',
    reloadOnRestart: true,
  });
  done();
};

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchFiles() {
  gulp.watch(path.styles.src).on('change', gulp.series(sassCompress, browserReload));
  gulp.watch(path.scripts.src).on('change', gulp.series(esTranspile, browserReload));
  gulp.watch(path.ejs.src).on('change', gulp.series(ejsCompile, browserReload));
}

exports.default = gulp.series(gulp.parallel(sassCompress, ejsCompile, esTranspile), gulp.parallel(browsersync, watchFiles));
exports.build = gulp.series(buildClean, images, gulp.parallel(sassCompress, ejsCompile, esTranspile), mapClean);
exports.imagemin = gulp.series(images);
exports.webp = gulp.series(webps);
exports.mapclean = gulp.series(mapClean);
