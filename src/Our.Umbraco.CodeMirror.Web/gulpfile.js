/// <binding ProjectOpened='watch-bootstrap, watch-main' />
var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require("gulp-sourcemaps"),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

gulp.task('main', function () {
    return gulp.src('css/editor.less')
        .pipe(sourcemaps.init())  // Process the original sources
        .pipe(less({
            plugins: [autoprefix, cleancss]
        }))
        .pipe(sourcemaps.write({ sourceRoot: './' })) // Add the map to modified source.
        .pipe(gulp.dest('css/'));
});

gulp.task("watch-main", function () {
    return gulp.watch("css/**/*.less", ["main"]);
});