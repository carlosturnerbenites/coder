export default class History {
  constructor() {
    this.history = [];
  }

  push (action, custom, canont = false) {
    this.history.push({action, ...custom, canont })
  }
}
