#!/usr/bin/env node

'use strict'

import <%= appNameCamel %> from '../'
import yargs from 'yargs'

const argv = yargs.usage('Usage: $0 (<source path> | <url>) <destination folder>')
  .showHelpOnFail(false, 'Specify --help for available options')
  .version(() => {
    return require('../package').version
  })
  .help('help')
  .argv
