'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let config = require('./tasks.config');
let tasks = require('boar-tasks-server').getTasks(gulp, config);

gulp.task('build', ['build-clean'], function(cb) {
    runSequence(['server-copy'], cb);
});

gulp.task('start', ['build'], function(cb) {
    runSequence(['server', 'server-watch'], cb);
});

gulp.task('test', tasks.server.test);

gulp.task('build-clean', function(cb) { tasks.build.clean(cb); });
gulp.task('server', tasks.server.start);
gulp.task('server-copy', function() { return tasks.server.copy(false); });
gulp.task('server-copy-only-changed', function () { return tasks.server.copy(true); });
gulp.task('server-watch', function() { gulp.watch(tasks.config.server.filePattern, ['server-copy-only-changed']) });
