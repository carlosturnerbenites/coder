<template>
  <div id="app">
    <Board></Board>
  </div>
</template>

<script>

import Board from './components/Board.vue'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    Board
  }
}
</script>

<style lang="scss">
.d-flex {
  display: flex
}
</style>
