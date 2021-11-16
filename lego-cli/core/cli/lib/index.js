'use strict';

const pkg = require('../package.json');

module.exports = core;

function core() {
  // TODO
  checkPackageVersion()
}

function checkPackageVersion() {
  console.log(pkg.version);
}
