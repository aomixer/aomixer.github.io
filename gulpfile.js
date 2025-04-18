const gulp = require('gulp');

// sass（DartSass）
const sass = require('gulp-sass')(require('sass'));

// PostCss
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // ベンダープレフィックス付けてくれる
const flexBugsFixes = require('postcss-flexbugs-fixes'); // ブラウザによるflexboxのバグを防ぐ記述に変更してくれる

// img(圧縮用)
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

// img(webp用)
const webp = require('gulp-webp');

// ejs
const ejs = require('gulp-ejs');
const ejsSrc = ['_src/ejs/**/*.ejs', '!' + '_src/ejs/**/_*.ejs'];
const rename = require('gulp-rename');

// webpack
const webpack = require('webpack'); // webpack本体
const webpackStream = require('webpack-stream'); // webpackをgulpで使用する為のプラグイン

// webpackの設定ファイルの読み込み
const webpackConfig = require('./webpack.config');

// other
const browserSync = require('browser-sync').create(); // 監視
const plumber = require('gulp-plumber'); // Stream中に起こるのエラーが原因でタスクが強制停止することを防止するモジュール
const replace = require('gulp-replace'); // 置き換える
const header = require('gulp-header'); // cssの先頭にcharset入れるために使用
const notify = require('gulp-notify'); // エラーがあったりしたら通知出してくれる
const del = require('del'); // 特定のファイル・ディレクトリを削除する用

// path
const distPath = './docs/assets'; // css、img、jsの出力先のパス
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

// autoprefixer config
const autoprefixerOption = {
  grid: true,
};

// PostCss config
const postcssOption = [autoprefixer(autoprefixerOption), flexBugsFixes];

// sassコンパイル
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

// 画像の最適化(設定)
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

// 画像の最適化
function images() {
  return gulp.src(path.images.src).pipe(imagemin(imageminOption)).pipe(gulp.dest(path.images.dest));
}

// webpの生成
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

// ejsのコンパイル
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

// webpackを使ってjsファイルをトランスパイルする
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
    .pipe(webpackStream(webpackConfig, webpack)) // webpackStreamの第2引数にwebpackを渡す。
    .pipe(gulp.dest(path.scripts.dest));
}

// mapファイルを削除
function mapClean() {
  return del([distPath + '/css/map/', distPath + '/js/script.js.map']);
}

function buildClean() {
  return del(distPath);
}

// ブラウザ自動更新&監視
const browsersync = (done) => {
  browserSync.init({
    //デフォルトのconnectedのメッセージ非表示
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

/**
 * デフォルトタスク
 * sassのコンパイル
 * ejsのコンパイル
 * jsのトランスパイル
 * npm run start でタスク起動
 */
exports.default = gulp.series(gulp.parallel(sassCompress, ejsCompile, esTranspile), gulp.parallel(browsersync, watchFiles));

// 納品前などに実行
exports.build = gulp.series(buildClean, images, gulp.parallel(sassCompress, ejsCompile, esTranspile), mapClean);

// 画像圧縮
exports.imagemin = gulp.series(images);

// webp用
exports.webp = gulp.series(webps);

// cssとjsのmapディレクトリ・ファイルを削除
exports.mapclean = gulp.series(mapClean);
