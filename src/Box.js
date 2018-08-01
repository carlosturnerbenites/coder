export default class Box {
  constructor(x, y, type = 'free') {
    this.x = x;
    this.y = y;
    this.type = type;

    this.TYPES = {
      FREE: 'free',
      OBSTACLE: 'obstacle'
    }
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }

  robotCanBeHere () {
    console.log(`${this.type} === ${this.TYPES.FREE}`, this.type === this.TYPES.FREE)
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

}
