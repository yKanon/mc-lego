#!/usr/bin/env node --experimental-json-modules --trace-warnings
import importLocal from 'import-local'

import lib from '../lib/index.js'
import log from '@wss-/log'

if (importLocal(import.meta.url)) {
    log.info('cli', '正在使用 lego-cli 本地版本。。。')
} else {
    lib(process.argv.slice(2))
}