const {src, dest, task, series} = require('gulp');
const sass = require('gulp-sass');
const rm = require("gulp-rm");
const sassGlob = require('gulp-sass-glob');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass')

task("copyHtml", () => {
    return src("*.html").pipe(dest("dist"));
})

task("copyResources", () => {
    return src(["src/img/**/*", "src/fonts/*","src", "src/video/**/*"],{base: "src"}).pipe(dest("dist/src"));
})

task("clean", () => {
    return src("dist/**/*",{read:false}).pipe(rm());
});

task("styles", () => {
    return src('src/css/main.scss').pipe(sass().on("error", sass.logError)).pipe(cleanCSS()).pipe(dest("dist/src/css")); //.pipe(sassGlob()).pipe(cleanCSS())
});

task("scripts", () => {
    return src("src/js/*.js").pipe(concat("main.js")).pipe(babel({
        presets: ['@babel/env']
    })).pipe(uglify()).pipe(dest("dist/src/js"));
})

task("default", series("clean","copyHtml","copyResources","styles","scripts"));

