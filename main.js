var kss = require('kss');
var _ = require('lodash');
var Minimatch = require('minimatch').Minimatch;

// WHERE THE WILD THINGS ARE
// styleguide.section('2.1.1')                                   // <KssSection>
// styleguide.section('2.1.1').description()                     // A button suitable for giving stars to someone
// styleguide.section('2.1.1').modifiers(0)                      // <KssModifier>
// styleguide.section('2.1.1').modifiers(0).name                 // ':hover'
// styleguide.section('2.1.1').modifiers(0).description          // 'Subtle hover highlight'
// styleguide.section('2.1.1').modifiers(':hover').description() // 'Subtle hover highlight'
// styleguide.section('2.1.1').modifiers(0).className()          // 'pseudo-class-hover'
// styleguide.section('2.x.x')                                   // [<KssSection>, ...]
// styleguide.section('2.1.1').modifiers()                       // [<KssModifier>, ...]

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