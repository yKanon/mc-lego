'use strict';

const pkg = require('../package.json');
const log = require('@wss-/log')

module.exports = core;

function core() {
  checkPackageVersion()
}

function checkPackageVersion() {
  log.notice('cli  version', pkg.version);
}
