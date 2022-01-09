#!/usr/bin/env node

const commander = require('commander');
// 获取commander单例
// const {program} = commander

// 手动实例化一个Command实例
const program = new commander.Command();

const pkg = require('../package.json');

program
  .name(Object.keys(pkg?.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .option('-d, --debug', '是否开启调试模式', false)
  .option('-e, --envName <envName>', '获取环境变量名称')

  // console.log(program.opts());
  // program.outputHelp()

// command 注册命令
program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log(source, destination);
    console.log('clone command called');
  });

// addCommand 注册子命令
const sub = new commander.Command('sub')
sub
  .command('start [service]')
  .description('start named service') 
  .action((service) => console.log(`do service start ${service}`))
sub
  .command('stop [service]')
  .description('stop named service, or all if no name supplied')

program
  .addCommand(sub)

program.parse(process.argv);
