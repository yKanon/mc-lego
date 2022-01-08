#!/usr/bin/env node

const commander = require('commander');
// 获取commander单例
// const {program} = commander

// 手动实例化一个Command实例
const program = new commander.Command();

const pkg = require('../package.json');

program
  .name(Object.keys(pkg?.bin)[0])
  .usage('[global options] command')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称')
  .parse(process.argv);

  console.log(program.debug)
  console.log(program.opts());
  program.outputHelp()