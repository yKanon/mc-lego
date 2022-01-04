#!/usr/bin/env node

const commander = require('commander');
// 获取commander单例
// const {program} = commander

// 手动实例化一个Command实例
const program = new commander.Command();

const pkg = require('../package.json');

program.version(pkg.version).parse(process.argv);
