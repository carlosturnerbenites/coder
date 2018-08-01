export default class Plan {
  constructor(config) {
    let movements = []

    if (Array.isArray(config.movements)) movements = config.movements

    this.movements = movements;
  }

  addMovement(movement) {
    let o
    if (typeof movement === 'string') {
      o = { action: movement}
    } else if (typeof movement === 'string') {
      o = movement
    } else {
      throw new Error('invalid type data movement')
    }
    this.movements.push(o)
  }

  execute (board) {
    let baseTime = 1000
    this.movements.forEach((movement, index) => {
      let time = baseTime * (index + 1)

      if (movement.action === 'collect') {
        window.setTimeout(() => board.collect(), time)
      } else if (movement.action === 'turnRight') {
        window.setTimeout(() => board.turnRight(), time)
      } else if (movement.action === 'turnLeft') {
        window.setTimeout(() => board.turnLeft(), time)
      } else if (movement.action === 'forward') {
        window.setTimeout(() => board.forward(), time)
      } else {
        throw new Error('movement unkown')
      }
    });
  }

}
