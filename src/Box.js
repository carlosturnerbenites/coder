export default class Box {
  constructor(x, y, type = 'free') {
    this.x = x;
    this.y = y;
    this.type = type;

    this.gifts = [];

    this.TYPES = {
      FREE: 'free',
      OBSTACLE: 'obstacle'
    }
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }

  robotCanBeHere () {
    if (this.type === this.TYPES.FREE) return true
    return false
  }
  setAsObstacle () {
    this.type = this.TYPES.OBSTACLE
  }
  isObstacle () {
    if (this.type !== this.TYPES.FREE) return true
    return false
  }
  addGift (points) {
    this.gifts.push(points)
  }
  getGift () {
    return this.gifts.pop()
  }

}
