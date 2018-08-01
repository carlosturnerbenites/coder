<template>
  <div
    class="box"
    @click="onClick"
    :class="{obstacle: box.isObstacle()}"
  >
    <span v-if="robotIsHere">
      <Robot :robot="robot"></Robot>
    </span>
    <div>
      <span
        class="gift"
        v-for="gift in box.gifts"
        :key="`gift_${gift.x}_${gift.y}`"
      >
      {{gift.points}}
      </span>
    </div>
  </div>
</template>

<script>

import Box from './../Box.js'
import Robot from './Robot.vue'

export default {
  name: 'Box',
  props: {
    robot: {
      type: Object,
      required: true
    },
    box: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    onClick () {
      this.$emit('click', this.box)
    },
    initialize () {

    }
  },
  computed: {
    robotIsHere () {
      if (this.robot.x === this.box.x && this.robot.y === this.box.y) {
        return true
      }
      return false
    }
  },
  components: {
    Robot
  }
}
</script>

<style lang="scss">
  .box {
    width: 50px;
    height: 50px;
    display: inline-block;
    border: 1px solid gray;
  }
  .obstacle {
    background-color: black
  }
  .gift {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: red;
    text-align: center;
    border-radius: 50px;
    color: black;
  }
</style>
