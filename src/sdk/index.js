'use strict'

import axios from 'axios'
import Vue from 'vue'
import config from '../config.js'
import './style.css'

if ('undefined' === typeof window.top.pl3b15c173) {
    window.top.pl3b15c173 = {}
}

window.top.pl3b15c173.loadApp = function(candidate_id) {
  let app = document.createElement('div')
  document.body.appendChild(app)

  new Vue({
    el: app,
    template: `
      <div id="pl3b15c173-container">
        <template v-if="stage === 1">
          <button class="pl3b15c173-button" v-on:click="stage=2">Voter pour ce projet</button>
        </template>

        <template v-else-if="stage === 2">
          <p class="pl3b15c173-error" v-if="error">{{ error }}</p>
          <input type="text" placeholder="Mon e-mail" required class="pl3b15c173-input" v-model="email">
          <button class="pl3b15c173-button" v-on:click="vote()" v-bind:disabled="!email">Voter !</button>
        </template>

        <template v-else-if="stage === 3">
          <p>Votre vote a bien été pris en compte !</p>
          <p>Confirme ce vote en cliquant dans le lien que nous t'avons envoyé <strong>et multiplie la valeur de ce vote par 10 !</strong>.</p>
          <p>En confirmant tu participeras également au tirage au sort pour gagner ton Pass Cabaret Vert 2018 !</p>
        </template>
      </div>`,
    data: {
      stage: 1,
      email: '',
      error: ''
    },
    methods: {
      vote: function() {
        axios.post(`${config.api_baseURL}/candidates/${candidate_id}/votes`, {
          email: this.email
        }).then(function(response) {
          this.stage = 3

          setTimeout(function(that) {
            that.reset()
          }, 10000, this)
        }.bind(this)).catch(function(error) {
          if (error.response && error.response.status === 400) {
            if (error.response.data.error === 'Vote already exists') {
              this.error = 'Vous avez déjà voté.'
            } else {
              this.error = 'Cette adresse ne semble pas valide.'
            }
          } else {
            this.error = 'Une erreur est survenue. Merci de réessayer.'
          }
        }.bind(this))
      },
      reset: function() {
        this.stage = 1
        this.email = ''
        this.error = ''
      }
    }
  })
}
