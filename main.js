var kss = require('kss');

module.exports = function (options) {
  return function (press, callback){
    kss.traverse(options.sassDir, { markdown: options.markdown }, function(err, styleguide) {
      if (err) {
        throw err;
      }
      press.data.kss = styleguide;
      callback(undefined, press);
    });
  };
};