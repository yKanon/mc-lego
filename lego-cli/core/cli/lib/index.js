'use strict';

import semver from 'semver'
import log from '@wss-/log'
import { existsSync } from  'fs'
import colors from 'colors/safe.js'

import pkg from '../package.json'
import { LOWEST_NODE_VERSION } from './const.js'

async function core() {
  try {
    checkPackageVersion()
    checkNodeVersion()
    await checkRoot()
    await checkUserHome()
  } catch (e) {
    log.error(colors.red(e.message))
  }
}

async function checkRoot() {
  // const rootCheck = (await import('root-check')).default
  const { default:rootCheck } = await import('root-check')
  rootCheck()
  // import('root-check').then(({ default: rootCheck }) => {
  //   rootCheck()
  // })
}

async function checkUserHome() {
  const { homedir } = await import('os')
  const userHome = homedir()

  if (!userHome || existsSync(userHome)) {
    throw new Error(`当前用户主目录不存在，请检查系统配置。`)
  }
}

function checkPackageVersion() {
  log.info('cli', pkg.version)
}

function checkNodeVersion() {
  const currentNodeVersion = process.version
  const lowestNodeVersion = LOWEST_NODE_VERSION

  if (semver.lte(currentNodeVersion, lowestNodeVersion)) {
    throw new Error(`当前 Node 版本 ${currentNodeVersion} 不支持，请升级 Node 至 ${lowestNodeVersion} 以上版本。`)
  }
}

export default core;
