export default class Gift {
  constructor(x, y, points) {
    this.x = x;
    this.y = y;
    this.points = points;
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
