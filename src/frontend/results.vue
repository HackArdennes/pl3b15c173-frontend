<template>
  <div>
    <h1>Résultats #HackCV17</h1>
    <p v-if="error">Une erreur est survenue...</p>
    <ul>
      <li v-for="result in results">
        <strong>{{ result.name }}</strong>
        -
        {{ result.nbVotes }} votes
        ({{ result.nbConfirmedVotes }} confirmés)
        -
        <strong>SCORE : {{ result.score }}</strong>
        <div v-bind:style="{ height: '10px', backgroundColor: 'green', width: result.percent+'%' }"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from '../config.js'

  export default {
    data: function() {
      return {
        results: [],
        error: false
      }
    },
    created: function() {
      axios.get(`${config.api_baseURL}/result`)
      .then(function(response) {
        let max = response.data.reduce(
          (max, result) => (result.score > max ? result.score : max), 0
        )

        this.results = response.data.map(
          result => {
            result.percent = max === 0 ? 100 : Math.round(result.score*100/max)
            return result
          }
        )
      }.bind(this))
      .catch(function() {
        this.error = true
      }.bind(this))
    }
  }
</script>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 20px;
  }
</style>