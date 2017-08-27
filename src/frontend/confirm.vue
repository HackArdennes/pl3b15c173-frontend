<template>
  <div>
    <template v-if="state === 'PENDING'">
      <h1>Confirmation en cours...</h1>
    </template>

    <template v-else-if="state === 'SUCCESS'">
      <h1 v-if="">Ton vote a été confirmé !</h1>
    </template>

    <template v-else-if="state === 'ALREADY_CONFIRMED'">
      <h1 v-if="">Ton vote a déjà été confirmé.</h1>
    </template>

    <template v-else-if="state === 'ERROR'">
      <h1 v-if="">Une erreur est survenue.</h1>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import config from '../config.js'

export default {
  data: function() {
    return {
      state: 'PENDING'
    }
  },
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
}
</script>
