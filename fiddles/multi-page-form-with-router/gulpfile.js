var gulp = require('gulp');
var browserSync = require('browser-sync');
var historyFallback = require('connect-history-api-fallback');

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './',
      port: 4000,
      middleware: [
        historyFallback()
      ]
    }
  });
})
