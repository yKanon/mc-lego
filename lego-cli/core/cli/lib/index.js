'use strict';

const semver = require('semver')
const log = require('@wss-/log')

const pkg = require('../package.json');
const { LOWEST_NODE_VERSION} = require('./const')

module.exports = core;

function core() {
  checkNodeVersion()
  checkPackageVersion()
}

function checkPackageVersion() {
  log.notice('package version', pkg.version)
}

function checkNodeVersion() {
  const currentNodeVersion = process.version
  const lowestNodeVersion = LOWEST_NODE_VERSION

  if (semver.lte(currentNodeVersion, lowestNodeVersion)) {
    log.error(`Your node version is ${currentNodeVersion}, but the minimum required version is ${lowestNodeVersion}`)
    process.exit(1)
  }
}