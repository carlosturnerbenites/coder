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
      class="row d-flex"
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
    <Button type="primary" @click="collect"> Recoger </Button>
    <Button type="primary" @click="evaluate"> Evaluar Escenario </Button>

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

    <div>
      <ul v-if="scene">
        <li
          v-for="(rule, index) in scene.rules"
          :class="{complete: rule.complete, incomplete: !rule.complete}"
          :key="`rule_${index}`"
        >
          {{rule.name}}
          <span v-if="rule.name === 'arrive'">
            {{rule.position}}
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
import Scene from './../Scene.js'

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
      board: new Board(this.height, this.width),
      scene: null,
      scenes: {
        default: new Scene({
          obstacles: [[1,1], [1,2], [2,2], [3,5], [4,2]],
          gifts: [[1,3, 20], [3,4, 30]],
          rules: [
            {name: 'arrive', position: {x:1, y:3}},
            {name: 'movements:min', q: 2},
            {name: 'movements:max', q: 10},
            {name: 'movements:between', min: 2, max: 10},
            {name: 'route', route: [
              {position: {x:1, y:3}, action: 'arrive'},
              {position: {x:1, y:3}, action: 'collect'},
              {position: {x:4, y:4}, action: 'arrive'},
            ]}
          ]
        })
      }
    }
  },
  methods: {
    onClickBox (box) {
    },
    collect () {
      this.board.collect()
    },
    evaluate () {
      this.board.evaluate()
    },
    forward () {
      let playload = {
        action: 'forward',
        position: {},
        canont: false
      }
      if (this.board.canForward()) {
        playload.position.before = this.board.robot.getPosition()
        this.board.robot.forward()
        playload.position.after = this.board.robot.getPosition()
        this.board.history.push(playload)
      } else {
        playload.canont = true
        this.board.history.push(playload)
      }
    },
    turnLeft () {
      let playload = {
        action: 'turn',
        orientation: {},
        canont: false
      }
      playload.orientation.before = this.board.robot.orientation
      this.board.robot.turnLeft()
      playload.orientation.after = this.board.robot.orientation
      this.board.history.push(playload)
    },
    turnRight () {
      let playload = {
        action: 'turn',
        orientation: {},
        canont: false
      }
      playload.orientation.before = this.board.robot.orientation
      this.board.robot.turnRight()
      playload.orientation.after = this.board.robot.orientation
      this.board.history.push(playload)
    },
    loadScene (scene) {
      this.scene = scene
      this.board.loadScene(scene)
    }
  },
  components: {
    Box
  },
  mounted () {
    // this.board.robot.to(1,2)
    this.loadScene(this.scenes.default)
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
.complete {
  background-color: green;
}
</style>
