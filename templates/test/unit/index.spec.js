/* global describe, it, expect */

'use strict'

import <%= appNameCamel %> from '../../src/index'

describe('appName test:', () => {
  it('instance is created', () => {
    expect(<%= appNameCamel %>).to.not.be.undefined
  })

  it('options are empty', () => {
    expect(<%= appNameCamel %>.options).to.be.empty
  })

  it('options are set', () => {
    <%= appNameCamel %>.options = {
      version: '0.1.0'
    }
    expect(<%= appNameCamel %>.options.version).to.be.equal('0.1.0')
  })
})
