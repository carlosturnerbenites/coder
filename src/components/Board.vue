<template>
  <div
    class="board"
    @keyup.up="forward"
    @keyup.left="board.robot.turnLeft()"
    @keyup.right="board.robot.turnRight()"
  >
    <div
      v-for="(row, index) in board.matrix"
      :key="`height_${index}`"
      class="row"
    >
      <div
        v-for="(box, index) in row"
        :key="`width_${index}`"
        span="1"
        class="box"
      >
        <Box
          @click="onClickBox"
          :robot="board.robot"
          :box="box"
        >
        </Box>
      </div>
    </div>

    <Button type="primary" @click="board.robot.turnLeft()"> Derecha </Button>
    <Button type="primary" @click="board.robot.turnRight()"> Izquierda </Button>
    <Button type="primary" @click="forward"> Adelante </Button>
  </div>
</template>

<script>

import Box from './Box.vue'
// import Robot from './Robot.vue'

import Board from './../Board.js'

export default {
  name: 'Board',
  props: {
    height: {
      type: Number,
      default: 10
    },
    width: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      board: new Board(this.height, this.width)
    }
  },
  methods: {
    onClickBox (box) {
    },
    forward () {
      console.log('forward')
      if (this.board.canForward()) {
        this.board.robot.forward()
      }
    }
  },
  components: {
    Box
  },
  mounted () {
    // this.board.robot.to(1,2)
    this.board.setObstacles([[1,1], [1,2], [2,2], [3,5], [7,2]])
  },
}
</script>

<style lang="scss">
.board {
  .row {
  }
}
</style>
