var kss = require('kss');

module.exports = function (options) {
  return function (acetate, callback){
    kss.traverse(options.sassDir, { markdown: options.markdown }, function(err, styleguide) {
      if (err) {
        throw err;
      }
      acetate.data.kss = styleguide;
      callback(undefined, acetate);
    });
  };
};