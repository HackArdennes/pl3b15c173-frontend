'use strict'

import axios from 'axios'
import Vue from 'vue'
import VueRouter from 'vue-router'
import config from '../config.js'

Vue.use(VueRouter)

const Homepage = Vue.extend({
  template: `<h1>Bienvenue !</h1>`
})

const About = Vue.extend({
  template: `<h1>A propos...</h1>`
})

const Confirm = Vue.extend({
  template: `
    <div>
      <template v-if="state === 'PENDING'">
        <h1>Confirmation en cours...</h1>
      </template>

      <template v-else-if="state === 'SUCCESS'">
        <h1 v-if="">Votre vote a été confirmé !</h1>
      </template>

      <template v-else-if="state === 'ALREADY_CONFIRMED'">
        <h1 v-if="">Votre vote a déjà été confirmé.</h1>
      </template>

      <template v-else-if="state === 'ERROR'">
        <h1 v-if="">Une erreur est survenue.</h1>
      </template>
    </div>`,
  data: () => ({
    state: 'PENDING'
  }),
  created: function() {
    const { candidate_id, vote_id, token } = this.$route.params
    axios.put(`${config.api_baseURL}/candidates/${candidate_id}/votes/${vote_id}`, {
      token
    }).then(function() {
      this.state = 'SUCCESS'
    }.bind(this)).catch(function(error) {
      if (error.response && error.response.status === 400 && error.response.data.error === 'Vote already confirmed') {
        this.state = 'ALREADY_CONFIRMED'
      } else {
        this.state = 'ERROR'
      }
    }.bind(this))
  }
})

const router = new VueRouter({
  routes: [
    { path: '/', component: Homepage },
    { path: '/about', component: About },
    { path: '/confirm/:candidate_id/:vote_id/:token', component: Confirm }
  ]
})

app = new Vue({
  router
}).$mount('#app')