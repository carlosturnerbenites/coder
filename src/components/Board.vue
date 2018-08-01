<template>
  <div
    class="board"
    @keyup.up="forward"
    @keyup.left="turnLeft"
    @keyup.right="turnRight"
    @keyup.enter="collect"
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

    <div>
      <Checkbox v-model="toPlan">Planear</Checkbox>
    </div>

    <div>
      <Button type="primary" @click="turnLeft"> Derecha </Button>
      <Button type="primary" @click="turnRight"> Izquierda </Button>
      <Button type="primary" @click="forward"> Adelante </Button>
      <Button type="primary" @click="collect"> Recoger </Button>
      <Button type="primary" @click="evaluate"> Evaluar Escenario </Button>
      <Button type="primary" @click="execute"> Ejecutar Plan </Button>
    </div>

    <Row>
        <Col span="6">
          <h4>Historial</h4>
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
        </Col>
        <Col span="6">
          <h4>Escenario</h4>
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
        </Col>
        <Col span="6">
          <h4>Plan</h4>
          <div>
            <ul v-if="plan">
              <li
                v-for="(movement, index) in plan.movements"
                :class="{executed: movement.executed}"
                :key="`movement_${index}`"
              >
                {{movement.action}}
              </li>
            </ul>
          </div>
        </Col>
        <Col span="6">
          <h4>Power Ups</h4>
          <ul>
            <li
              v-for="(powerUp, name) in powerUps"
              :key="`power_up_${name}`"
            >
              <Checkbox
                @on-change="value => setStatePowerUp(powerUp, value)"
              >{{ name }}</Checkbox>
            </li>
          </ul>
        </Col>
    </Row>

  </div>
</template>

<script>

import Box from './Box.vue'
// import Robot from './Robot.vue'

import Board from './../Board.js'
import Scene from './../Scene.js'
import Plan from './../Plan.js'
import PowerUp from './../PowerUp.js'

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
      plan: null,
      toPlan: false,
      scenes: {
        default: new Scene({
          obstacles: [[1,1], [1,2], [2,2], [3,4], [4,2]],
          gifts: [[1,3, 20], [3,4, 30]],
          rules: [
            // points:min
            // gift:min
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
      },
      plans: {
        default: new Plan({
          movements: [
            /*
            {
              action: 'while',
              // condition: 'ORIENTATION !== 0',
              condition: {prop: 'orientation', op: 'diff', value: 270},
              fn: 'turnRight'
            },
            */
            // {action: 'if', condition: 'ORIENTATION !== 0', fn: 'forward'},

            {action: 'repeat', count: 3, fn: 'forward'},

            // {action: 'forward'},
            // {action: 'forward'},
            // {action: 'forward'},

            {action: 'turnLeft'},
            {action: 'forward'},
            {action: 'collect'},
            {action: 'forward'},
            {action: 'forward'},
            {action: 'forward'},
            {action: 'turnRight'},
            {action: 'forward'},
          ]
        })
      },
      powerUps: {
        climb: new PowerUp('climb')
      }
    }
  },
  methods: {
    onClickBox (box) {
    },
    setStatePowerUp (powerUp, state) {
      if (state) {
        this.board.robot.enablePowerUp(powerUp)
      } else {
        this.board.robot.disablePowerUp(powerUp)
      }
    },
    collect () {
      if (this.toPlan) {

      } else {
        this.board.collect()
      }
    },
    evaluate () {
      this.board.evaluate()
    },
    execute () {
      this.plans.default.execute(this.board)
    },
    forward () {
      if (this.toPlan) {
        this.plan.addMovement('forward')
      } else {
        this.board.forward()
      }

    },
    turnLeft () {
      if (this.toPlan) {
        this.plan.addMovement('turnLeft')
      } else {
        this.board.turnLeft()
      }
    },
    turnRight () {
      if (this.toPlan) {
        this.plan.addMovement('turnRight')
      } else {
        this.board.turnRight()
      }
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
    this.board.enablePowerUps()
    // this.board.robot.enablePowerUp(this.powerUps.climb)
    this.loadScene(this.scenes.default)
    this.plan = this.plans.default

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
.executed {
  background-color: green;
}
</style>
