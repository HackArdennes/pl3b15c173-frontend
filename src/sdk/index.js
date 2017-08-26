'use strict'

import Vue from 'vue'
import AppVue from './app.vue'

if ('undefined' === typeof window.top.pl3b15c173) {
    window.top.pl3b15c173 = {}
}

window.top.pl3b15c173.loadApp = function(candidate_id) {
  const app = document.createElement('div')
  document.body.appendChild(app)

  new Vue({
    el: app,
    render: (h) => { return h(AppVue) }
  })
}
