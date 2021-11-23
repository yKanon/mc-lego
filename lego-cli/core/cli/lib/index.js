'use strict';

import semver from 'semver'
import log from '@wss-/log'

import pkg from '../package.json'
import { LOWEST_NODE_VERSION } from './const.js'

function core() {
  checkPackageVersion()
  checkNodeVersion()
  checkRoot()
}

async function checkRoot() {
  // const rootCheck = (await import('root-check')).default
  const { default:rootCheck } = await import('root-check')
  rootCheck()
  console.log(process.geteuid());
  // import('root-check').then(({ default: rootCheck }) => {
  //   rootCheck()
  // })
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

// console.log(core);
export default core;
