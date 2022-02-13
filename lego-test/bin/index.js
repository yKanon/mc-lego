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

program
    .command('install [name]', '安装依赖', {
        executableFile: 'wss',
        hidden: true,
        // isDefault: true
    })
    .alias('i')

// yargs.demandCommand
// program
//     .arguments('<cmd> [options]')
//     .description('test cmd', {
//         cmd: 'command to run',
//         options: 'options for command',
//     })
//     .action((cmd, options) => {
//         console.log(cmd, options)
//     })

// console.log(program.opts());
// program.outputHelp()

// 高级定制1：自定义 help 信息
// program.helpInformation = function () {
//     return 'hi man\n'
// }
// program.on('--help', function () {
// console.log(`your help information`)
// })

// 高级定制2：实现 debug 模式
program.on('option:debug', function () {
    // console.log('debug');
    process.env.LOG_LEVEL = 'verbose';
    console.log(process.env.LOG_LEVEL);
})

// 高级定制3：对未知命令监听
// program.on('command:*', function () {
//     console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
//     process.exit(1);
// })

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
