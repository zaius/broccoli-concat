# broccoli-concat

Takes a tree as an input and concatenates it into a single file.

## Usage

```js
var concat = require('broccoli-concat');
var vendor = broccoli.makeTree('vendor');
vendor = concat(vendor, {
  inputFiles: [
    'jquery/dist/jquery.js',
    'momentjs/moment.js'
  ],
  outputFile: '/scripts/vendor.js'
});
```
