/* global describe, it, expect */

'use strict'

import <%= appNameCamel %> from '../../dist/index'

describe('appName test:', () => {

  it('instance is created', () => {
    expect(<%= appNameCamel %>).to.not.be.undefined
  })

})
