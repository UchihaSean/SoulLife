/**
 * Created by glcsnz123 on 2016/2/29.
 */
var exec = require('cordova/exec');

exports.getExtra = function(success, error) {
  exec(success, error, "ExtraInfo", "getExtra", []);
};
