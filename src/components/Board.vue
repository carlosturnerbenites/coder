<template>
  <div
    class="board"
    @keyup.up="forward"
    @keyup.left="turnLeft()"
    @keyup.right="turnRight()"
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

    <Button type="primary" @click="turnLeft"> Derecha </Button>
    <Button type="primary" @click="turnRight"> Izquierda </Button>
    <Button type="primary" @click="forward"> Adelante </Button>

    <div>
      <ul>
        <li
          v-for="(item, index) in board.history"
          :class="{canont: item.canont}"
          :key="`index_${index}`"
        >
          {{item.action}}
          <span v-if="item.action === 'turn'">
            {{item.orientation.after}}
          </span>
        </li>
      </ul>
    </div>
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
      default: 5
    },
    width: {
      type: Number,
      default: 5
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
      if (this.board.canForward()) {
        this.board.robot.forward()
        this.board.history.push({action: 'forward', canont: false})
      } else {
        this.board.history.push({action: 'forward', canont: true})
      }
    },
    turnLeft () {
      let playLoad = {
        action: 'turn',
        orientation: {},
        canont: false
      }
      playLoad.orientation.before = this.board.robot.orientation
      this.board.robot.turnLeft()
      playLoad.orientation.after = this.board.robot.orientation
      this.board.history.push(playLoad)
    },
    turnRight () {
      let playLoad = {
        action: 'turn',
        orientation: {},
        canont: false
      }
      playLoad.orientation.before = this.board.robot.orientation
      this.board.robot.turnRight()
      playLoad.orientation.after = this.board.robot.orientation
      this.board.history.push(playLoad)
    }
  },
  components: {
    Box
  },
  mounted () {
    // this.board.robot.to(1,2)
    this.board.setObstacles([[1,1], [1,2], [2,2], [3,5], [4,2]])
  },
}
</script>

<style lang="scss">
.board {
  .row {
  }
}
.canont {
  text-decoration: line-through;
}
</style>
