var fs = require('fs');
var nunjucks = require('nunjucks');
var template;

function NunjucksStyleguide() {

  this.tags = ['styleguide'];

  this.parse = function(parser, nodes, lexer) {
    // get the tag token
    var tok = parser.nextToken();

    // parse the args and move after the block end. passing true
    // as the second arg is required if there are no parentheses
    var args = parser.parseSignature(null, true);
    var section = args.children[0].value;
    parser.advanceAfterBlockEnd(tok.value);

    // parse the body then call the extension
    var body = parser.parseUntilBlocks('endstyleguide');
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, 'run', args, [body]);
  };

  this.run = function(context, section, body) {
    //section is the object of the kss information
    //body is the sample html
    var html = body();
    var res = template.render({ section: section, html: html });
    return res;
  };
}

module.exports = function (options) {
  return function (acetate, callback){

    var templatePath = './styleguide.html';
    if (options.template) {
      var templatePath = process.cwd() + '/' + acetate.options.src + '/' + options.template;
    }

    var file = fs.readFileSync(templatePath).toString();
    template = new nunjucks.Template(file);

    acetate.nunjucks.addExtension('styleguide', new NunjucksStyleguide());
    callback(undefined, acetate);

  };
};