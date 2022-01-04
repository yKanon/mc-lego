#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const dedent = require('dedent');
const pkg = require('../package.json');
const cli = yargs(hideBin(process.argv));

const context = {
  legoVersion: pkg.version,
};

cli
  .usage('Usage: $0 [command] <option>')
  .demandCommand(
    1,
    'A command is required. Please --help to see all available commands and options.'
  )
  .recommendedCommands()
  .fail((err, msg) => {
    console.log(`err.msg::=====>>`, msg);
  })
  .alias('h', 'help')
  .alias('v', 'version')
  .wrap(yargs.terminalWidth())
  .epilogue(
    dedent`
      When a command fails, all logs are written to lerna-debug.log in the current working directory.
      For more information, find our manual at https://github.com/lerna/lerna
    `
  )
  .options({})
  .option('registry', { type: 'string' })
  .group([' debug '], 'Dev Options:')
  .group([' registry '], 'Extra Options:')
  .command(
    'init [name]',
    'do init a project',
    (yargs) => {},
    (argv) => {}
  )
  .command({ command: 'list' })
  .parse(cli.argv, context);
