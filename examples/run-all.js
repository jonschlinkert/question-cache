var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

var examples = fs.readdirSync(__dirname);

var i = -1;
next(function (err) {
  if (err) {
    console.error(err);
  }
  process.exit(0);
});

function next(cb) {
  i++;
  if (i >= examples.length) return cb();

  var fp = examples[i];
  if (fp === path.basename(__filename)) return next(cb);

  console.log();
  console.log('Running examples/' + fp);
  console.log();

  var child = spawn('node', [path.join(__dirname, fp)],  {stdio: 'inherit'});
  child.on('error', cb);
  child.on('close', function () {
    next(cb);
  });
}
