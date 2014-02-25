var broccoli = require('broccoli')
var Transform = require('broccoli-transform');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

module.exports = Concat;
Concat.prototype = Object.create(Transform.prototype);
Concat.prototype.constructor = Concat;

function Concat(inputTree, options) {
  if (!(this instanceof Concat)) return new Concat(inputTree, options);
  this.inputTree = inputTree;
  options = options || {};
  this.inputFiles = options.inputFiles;
  this.outputFile = options.outputFile;
}

Concat.prototype.transform = function(srcDir, destDir) {
  var inputFiles = broccoli.helpers.multiGlob(this.inputFiles, {cwd: srcDir});
  var output = [];
  for (var i = 0; i < inputFiles.length; i++) {
    var fullPath = srcDir + '/' + inputFiles[i];
    var content = fs.readFileSync(fullPath).toString();
    output.push(content);
  }

  broccoli.helpers.assertAbsolutePaths([this.outputFile]);
  mkdirp.sync(path.join(destDir, path.dirname(this.outputFile)));

  var destFile = path.join(destDir, this.outputFile);
  fs.writeFileSync(destFile, output.join(''));
}
