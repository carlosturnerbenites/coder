import Box from './Box.js'
import Robot from './Robot.js'
import Gift from './Gift.js'

export default class Board {
  constructor(height, width) {
    this.height = height;
    this.width = width;

    this.robot = new Robot(0, 0);

    this.history = []
    this.scene = null

    this.matrix = []

    this.generateMatrix()
  }
  toString () {
    return this.height + ' x ' + this.width;
  }
  generateMatrix () {
    for (let h = 0; h < this.height; h++) {
      let row = []
      for (let w = 0; w < this.width; w++) {
        row.push(new Box(h, w))
      }
      this.matrix.push(row)
    }
  }
  getBox (position) {
    let x
    let y
    if (Array.isArray(position)) {
      x = position[0]
      y = position[1]
    } else if (typeof position === 'object') {
      x = position.x
      y = position.y
    } else {
      throw new Error('Bad format param position')
    }

    if (this.matrix[x] === undefined) throw new Error('outside index matrix')
    if (this.matrix[x][y] === undefined) throw new Error('outside index matrix')

    return this.matrix[x][y]

  }
  canForward () {
    let position = this.robot.getPositionForward()
    try {
      let box = this.getBox(position)
      if (box.robotCanBeHere()) return true
      return false
    } catch (error) {
      console.warn(error)
      return false
    }
  }
  setObstacles (positions) {
    positions.forEach(position => {
      try {
        let box = this.getBox(position)
        box.setAsObstacle()
      } catch (error) {
        console.warn(error)
      }
    })
  }
  setGifts (positions) {
    positions.forEach(position => {
      try {
        let box = this.getBox(position)
        box.addGift(new Gift(position[0], position[1], position[2]))
      } catch (error) {
        console.warn(error)
      }
    })
  }
  collect () {
    try {
      let position = this.robot.getPosition()
      console.log(position)
      let box = this.getBox(position)
      let gift = box.getGift()
      if (gift) {
        this.robot.addGift()
        this.history.push({ action: 'collect', canont: false })
      } else {
        this.history.push({ action: 'collect', canont: true })
      }
    } catch (error) {
      console.warn(error)
    }
  }
  loadScene (scene) {
    this.scene = scene
    this.setObstacles(scene.obstacles)
    this.setGifts(scene.gifts)
  }
  evaluate () {
    if (this.scene) {
      this.scene.evaluate(this.history)
    } else {
      throw new Error('scene not loaded')
    }
  }
  clearScene () {
    this.scene = null
  }
}
