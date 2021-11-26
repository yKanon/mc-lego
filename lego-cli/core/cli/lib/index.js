'use strict';

import path from 'path'
import semver from 'semver'
import log from '@wss-/log'
import {existsSync} from 'fs'
import colors from 'colors/safe.js'
import {homedir} from 'os'

import pkg from '../package.json'
import {DEFAULT_CLI_HOME, LOWEST_NODE_VERSION} from './const.js'

const userHome = homedir()
let argv = Object.create(null), cliConfig = Object.create(null)

async function core(args) {
    try {
        checkPackageVersion()
        checkNodeVersion()
        await checkRoot()
        checkUserHome()
        await checkInputArgs(args)
        await checkEnv()
    } catch (e) {
        log.error(colors.red(e.message))
    }
}

async function checkEnv() {
    const dotenvPath = path.resolve(userHome, '.env')
    const dotenv = await import('dotenv')

    // 读取加载`${userHome}/.env`的环境变量
    if (existsSync(dotenvPath)) {
        dotenv.config({
            path: dotenvPath
        })
    }
    createDefaultConfig()

    log.verbose('环境变量配置', process.env.CLI_HOME_PATH)
}

function createDefaultConfig() {
    const config = {
        home: userHome
    }

    const cliHome = process.env.CLI_HOME
    if (cliHome) {
        config['cliHome'] = path.join(userHome, cliHome)
    } else {
        config['cliHome'] = path.join(userHome, DEFAULT_CLI_HOME)
    }
    process.env.CLI_HOME_PATH = config['cliHome']
}

async function checkRoot() {
    // const rootCheck = (await import('root-check')).default
    const {default: rootCheck} = await import('root-check')
    rootCheck()
    // import('root-check').then(({ default: rootCheck }) => {
    //   rootCheck()
    // })
}

function checkUserHome() {
    if (!userHome || !existsSync(userHome)) {
        throw new Error(`当前用户主目录不存在，请检查系统配置。`)
    }
}

async function checkInputArgs(args) {
    argv = (await import('minimist')).default(args)
    let level = process.env.LOG_LEVEL || 'info'
    if (argv.debug) {
        level = process.env.LOG_LEVEL = 'verbose'
    }

    log.level = level
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
