'use strict'

import Vue from 'vue'
import MainVue from './sdk.vue'

if ('undefined' === typeof window.top.pl3b15c173) {
    window.top.pl3b15c173 = {}
}

window.top.pl3b15c173.loadApp = function(candidate_id) {
  let app = document.createElement('div')
  document.body.appendChild(app)

  new Vue({
    el: app,
    render: function(h) { return h(MainVue) }
  })
}
