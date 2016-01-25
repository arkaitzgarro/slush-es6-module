'use strict';

class <%= appNameCamel %> {

  constructor () {
    this._options = {}
  }

  set options (options = {}) {
    this._options = options
  }

  get options () {
    return this._options
  }
}

export default new <%= appNameCamel %>()
export {<%= appNameCamel %>}
