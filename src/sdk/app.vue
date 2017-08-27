<template>
  <div id="pl3b15c173-container">
    <template v-if="stage === 1">
      <button class="pl3b15c173-button" v-on:click="stage=2">Je vote pour ce projet</button>
    </template>

    <template v-else-if="stage === 2">
      <p class="pl3b15c173-error" v-if="error">{{ error }}</p>
      <input type="text" placeholder="Mon e-mail (pour valider le vote)" required class="pl3b15c173-input" v-model="email">
      <button class="pl3b15c173-button" v-on:click="vote()" v-bind:disabled="!email">Voter !</button>
    </template>

    <template v-else-if="stage === 3">
      <h1>+1 point pour cette appli !</h1>
      <p><strong>Multiplie ton vote par 10 et tente de gagner ton pass 4J pour le Cabaret Vert 2018.</strong></p>
      <p>Fonce voir le mail que nous t'avons envoyé et confirme ton vote.</p>
    </template>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '../config.js'
  import './style.css'

  export default {
    data: function() {
      return {
        stage: 1,
        email: '',
        error: ''
      }
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
              this.error = 'Cet e-mail ne semble pas valide.'
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
  }
</script>
