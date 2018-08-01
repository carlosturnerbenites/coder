<template>
  <div class="robot">
    <span v-html="rowOrientation"></span>
  </div>
</template>

<script>

import Robot from './../Robot.js'

export default {
  name: 'Robot',
  props: {
    robot: {
      type: Object,
      required: true
    },
  },
  computed: {
    rowOrientation () {
      return this.robot.getRowOrientation()
    }
  }
}
</script>

<style lang="scss">
  .robot {
    background-color: gray;
    font-size: 26px;
    color: white;
    font-weight: bold;
    width: 40px;
    height: 40px;
    border-radius: 50px;
    text-align: center;
  }
</style>
