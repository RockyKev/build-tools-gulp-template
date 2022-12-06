"use strict";

const autoprefixer = require("autoprefixer");
const babel = require('gulp-babel');
const concat = require("gulp-concat");
const csso = require("gulp-csso");
const del = require("del");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const include = require("posthtml-include");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const posthtml = require("gulp-posthtml");
const rename = require("gulp-rename");
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass')(require('sass'));
const server = require("browser-sync").create();
const svgstore = require("gulp-svgstore")
const webp = require("gulp-webp");
const uglify = require('gulp-uglify');

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
  .pipe(concat('index.js')) //  Scenario 1 - combine files
  .pipe(babel({presets: ['@babel/env']})) // Scenario 4 - Babel
  .pipe(uglify()) // Scenario 2 - Minify & Obfuscate
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('asset/js'))
})



gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer() ])) // Scenario 3 - Vendor Prefixes
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("asset/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "asset/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("src/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("src/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("images", function() {
  return gulp.src("src/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))

    .pipe(gulp.dest("src/img"));

});

gulp.task("webp", function () {
  return gulp.src("src/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("src/img"));
});

gulp.task("sprite", function () {
  return gulp.src("src/img/{icon-*,htmlacademy*}.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest("asset/img"));
});

gulp.task("html", function () {
  return gulp.src("src/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**",
    "src/js/**",
    "src//*.ico"
    ], {
      base: "source"
    })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "js", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
