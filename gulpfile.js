var gulp = require('gulp');
var replace = require('replace');
var replaceFiles = ['./www/js/app.js'];

gulp.task('add-proxy', function() {
  return replace({
    regex: "http://www.cooldomain.com/SoapTest/webservicedemo.asmx",
    replacement: "http://localhost:8100/api",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})

gulp.task('remove-proxy', function() {
  return replace({
    regex: "http://localhost:8100/api",
    replacement: "http://www.cooldomain.com/SoapTest/webservicedemo.asmx",
    paths: replaceFiles,
    recursive: false,
    silent: false,
  });
})
