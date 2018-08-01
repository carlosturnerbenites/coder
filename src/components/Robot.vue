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
  .box {
    width: 50px;
    height: 50px;
    display: inline-block;
    border: 1px solid gray;
  }
</style>
