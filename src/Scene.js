export default class Scene {
  constructor(config = {}) {
    let obstacles = []
    let gifts = []
    let rules = []

    if (Array.isArray(config.obstacles)) obstacles = config.obstacles
    if (Array.isArray(config.gifts)) gifts = config.gifts
    if (Array.isArray(config.rules)) rules = config.rules


    this.obstacles = obstacles;
    this.gifts = gifts;
    this.rules = rules;

    this.setDefaultStateRules()
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }

  setDefaultStateRules () {
    this.rules.forEach(r => r.complete = false)
  }

  evaluate (history) {
    this.rules.forEach(rule => {
      let state = false
      let countMovements = history.length

      if (rule.name === 'movements:min') {
        state = countMovements >= rule.q
      } if (rule.name === 'movements:max') {
        state = countMovements <= rule.q
      } if (rule.name === 'movements:between') {
        state = countMovements >= rule.min && countMovements <= rule.max
      } else if (rule.name === 'route') {
        let statesRules = []
        rule.route.forEach(r => {
          let actionState = false
          if (r.action === 'arrive') {
            actionState = state = history
              .filter(h => h.action === 'forward' && h.canont === false)
              .some(h => {
                return h.position.after.x === r.position.x &&
                  h.position.after.y === r.position.y
              })
          }
          if (r.action === 'collect') {
            actionState = state = history
              .filter(h => h.action === 'collect' && h.canont === false)
              .some(h => {
                return h.position.x === r.position.x &&
                  h.position.y === r.position.y
              })
          }
          statesRules.push(actionState)
        })
        state = statesRules.every(sr => sr === true)
      } else if (rule.name === 'arrive') {
        state = history
          .filter(h => h.action === 'forward' && h.canont === false)
          .some(h => {
            return h.position.after.x === rule.position.x &&
              h.position.after.y === rule.position.y
          })
      }
      rule.complete = state
    })
  }
}
