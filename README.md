
# Acetate-KSS

Acetate-KSS parses a folder of sass files with [KSS-formatted documentation](http://warpspire.com/kss/) and makes that data available as data in [Acetate](https://github.com/patrickarlt/acetate).

It also includes a simple [Nunjucks Template](http://mozilla.github.io/nunjucks/) for displaying KSS documentation in your Acetate site.

# Installation

To install, simply add `acetate-kss` to the `package.json` of an existing press site:

```
npm install --save-dev acetate-kss
```

# Use

Using Acetate-KSS is as simple as adding a couple lines to `acetate.conf.js`. An example conf file could look something like:

```js
// Load press kss to add data to your site
var acetateKSS = require('acetate-kss');
// Load the styleguide to get the Nunjucks template
var styleguide = require('acetate-kss/styleguide');

function config(acetate) {
  acetate.global('config', {
    environment: 'dev',
  });

  acetate.layout('**/*', 'layouts/_layout:content');

  acetate.options.src = 'docs/source';
  acetate.options.dest = 'docs/build';

  // Tell Acetate to use the KSS extension
  acetate.use(acetateKSS({
    // point the extension to your sass folder
    sassDir: 'sass/',
    markdown: true
  }));

  // Tell Acetate to load the Nunjucks helper
  acetate.use(styleguide({
    // use a custom template for styleguide block (optional)
    template: 'partials/_styleguide_block.html'
  }));
}

module.exports = config;
```

Then, in whatever page you need the kss data, just add it to the frontmatter:

```
data:
  - kss
```

And in your page, render a block of documentation by calling the Nunjucks helper:

```
{% styleguide kss.section('1.1') %}
  <h1 class="$modifier_class">Hey man</h1>
{% endstyleguide %}
```
