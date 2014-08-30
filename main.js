var kss = require('kss');

module.exports = function (directory, options) {
  return function (press, callback){
    kss.traverse(directory, options, function(err, styleguide) {
      if (err) {
        throw err;
      }
      press.data.kss = styleguide;
      callback(undefined, press);
    });
  };
};