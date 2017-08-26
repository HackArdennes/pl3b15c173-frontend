'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import AppVue from './app.vue'
import ConfirmVue from './confirm.vue'
import HomepageVue from './homepage.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/confirm/:candidate_id/:vote_id/:token', component: ConfirmVue }
  ]
})

const app = new Vue({
  router,
  render: function(h) { return h(AppVue) }
}).$mount('#app')
