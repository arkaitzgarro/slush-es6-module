/*
 * slush-slush-es6-module
 * https://github.com/arkaitzgarro/slush-slush-es6-module
 *
 * Copyright (c) 2016, Arkaitz Garro
 * Licensed under the MIT license.
 */

'use strict'

var gulp = require('gulp')
var conflict = require('gulp-conflict')
var install = require('gulp-install')
var rename = require('gulp-rename')
var template = require('gulp-template')

var _ = require('underscore.string')
var inquirer = require('inquirer')
var path = require('path')

var paths = [
  __dirname + '/templates/**'
]

var format = function format (string) {
  var username = string.toLowerCase()

  return username.replace(/\s/g, '')
}

var defaults = (function () {
  var workingDirName = path.basename(process.cwd())
  var homeDir, osUserName, configFile, user

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase()
  } else {
    homeDir = process.env.HOME || process.env.HOMEPATH
    osUserName = homeDir && homeDir.split('/').pop() || 'root'
  }

  configFile = path.join(homeDir, '.gitconfig')
  user = {}

  if (require('fs').existsSync(configFile)) {
    user = require('iniparser').parseSync(configFile).user
  }

  return {
    appName: workingDirName,
    userName: osUserName || format(user.name || ''),
    authorName: user.name || '',
    authorEmail: user.email || '',
    cli: false
  }
})()

var prompts = [
  {
    name: 'appName',
    message: 'What is the name of your project?',
    default: defaults.appName
  }, {
    name: 'appDescription',
    message: 'What is the description?'
  }, {
    name: 'appVersion',
    message: 'What is the version of your project?',
    default: '0.1.0'
  }, {
    name: 'authorName',
    message: 'What is the author name?',
    default: defaults.authorName
  }, {
    name: 'authorEmail',
    message: 'What is the author email?',
    default: defaults.authorEmail
  }, {
    name: 'userName',
    message: 'What is the github username?',
    default: defaults.userName
  }, {
    type: 'confirm',
    name: 'hasCli',
    message: 'Will you need a CLI?',
    default: defaults.cli
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }
]

gulp.task('default', function (done) {
  inquirer.prompt(prompts, function (answers) {
    if (!answers.moveon) {
      return done()
    }

    // Only add CLI support if needed
    if (!answers.hasCli) {
      paths.push('!' + __dirname + '/templates/cli.js')
      paths.push('!' + __dirname + '/templates/{bin,bin/**}')
    }

    answers.appNameSlug = _.slugify(answers.appName)
    answers.appNameCamel = _.classify(answers.appName)

    gulp.src(paths)
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1)
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function () {
        done()
      })
  })
})
