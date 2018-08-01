export default class Robot {
  constructor(x, y, orientation = null) {
    this.UP = 90
    this.DOWN = 270
    this.LEFT = 180 // Izq
    this.RIGHT = 0 // Der

    this.x = x;
    this.y = y;
    this.orientation = typeof orientation === 'number' ? orientation : this.UP
    this.gifts = []

    this.powerUps = {}

    /*
      // orientacion
      // left : 90 -> 0 -> 270 -> 180 -> 90
      // right : 90 -> 180 -> 270 -> 0 -> 90
          90
      180     0
          270
    */

  }
  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }
  enablePowerUp (powerUp) {
    this.powerUps[powerUp.name] = powerUp
  }
  disablePowerUp (powerUp) {
    let name
    if (typeof powerUp === 'string') {
      name = powerUp
    } else if (typeof powerUp === 'object') {
      name = powerUp.name
    } else {
      throw new Error('invalid type data powerUp')
    }
    delete this.powerUps[name]
  }
  can (action) {
    if ( this.powerUps[action] !== undefined) return true
    return false
  }
  to (x, y) {
    this.x = x
    this.y = y
  }
  back () {
    // atras
  }
  getPosition () {
    return {
      x: this.x,
      y: this.y
    }
  }
  getPositionForward () {
    let position = {}

    if (this.orientation === this.UP) {
      position.x = this.x - 1
      position.y = this.y
    }
    if (this.orientation === this.DOWN) {
      position.x = this.x + 1
      position.y = this.y
    }
    if (this.orientation === this.LEFT) {
      position.y = this.y - 1
      position.x = this.x
    }
    if (this.orientation === this.RIGHT) {
      position.y = this.y + 1
      position.x = this.x
    }

    return position
  }
  forward () {
    let position = this.getPositionForward()

    this.x = position.x
    this.y = position.y
  }
  turnLeft () {
    if (this.orientation === 0) {
      this.orientation = 270
    } else {
      this.orientation -= 90
    }
  }
  turnRight () {
    if (this.orientation === 270) {
      this.orientation = 0
    } else {
      this.orientation += 90
    }
  }
  getRowOrientation () {
    if (this.orientation === 0) return '&#8594'
    if (this.orientation === 180) return '&#8592'
    if (this.orientation === 90) return '&#8593'
    if (this.orientation === 270) return '&#8595'
  }
  addGift (gift) {
    this.gifts.push(gift)
  }

}
