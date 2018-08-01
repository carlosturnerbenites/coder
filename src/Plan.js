export default class Plan {
  constructor(config) {
    let movements = []

    if (Array.isArray(config.movements)) movements = config.movements

    this.movements = movements;

    this.setDefaultStateMovements()
  }

  setDefaultStateMovements () {
    this.movements.forEach(r => r.executed = false)
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
    let time = 1000
    this.movements.forEach((movement, index) => {
      if (movement.executed) return
      time += baseTime

      if (movement.action === 'repeat') {
        for (let i = 0; i < movement.count; i++) {
          window.setTimeout(() => board[movement.fn](), time)
          time += baseTime
        }
        window.setTimeout(() => { movement.executed = true }, time)
      } else if (movement.action === 'while') {
        let condition
        if (movement.condition.op === 'diff') {
          console.log('movement.condition.prop', board.robot[movement.condition.prop])
          condition = board.robot[movement.condition.prop] !== movement.condition.value
        }
        let countLoops = 0
        while (condition) {
          window.setTimeout(() => {
            board[movement.fn]()
            if (movement.condition.op === 'diff') {
              console.log('movement.condition.prop', board.robot[movement.condition.prop])
              condition = board.robot[movement.condition.prop] !== movement.condition.value
              console.log('condition', condition)
            }
          }, time)
          time += baseTime
          if (countLoops > 50) break
          countLoops += 1
        }
      } else if (movement.action === 'collect') {
        window.setTimeout(() => {
          board.collect()
          movement.executed = true
        }, time)
      } else if (movement.action === 'turnRight') {
        window.setTimeout(() => {
          board.turnRight()
          movement.executed = true
        }, time)
      } else if (movement.action === 'turnLeft') {
        window.setTimeout(() => {
          board.turnLeft()
          movement.executed = true
        }, time)
      } else if (movement.action === 'forward') {
        window.setTimeout(() => {
          board.forward()
          movement.executed = true
        }, time)
      } else {
        throw new Error('movement unkown')
      }
      // movement.executed = true
      console.log('time', time)
    });
  }

}
