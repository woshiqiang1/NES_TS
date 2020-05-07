class Controller {
  constructor() {
    this.state = new Array(8)
    for (let i = 0; i < this.state.length; i++) {
      this.state[i] = 0x40;
    }
  }
  state: number[]

  static BUTTON_A = 0
  static BUTTON_B = 1
  static BUTTON_SELECT = 2
  static BUTTON_START = 3
  static BUTTON_UP = 4
  static BUTTON_DOWN = 5
  static BUTTON_LEFT = 6
  static BUTTON_RIGHT = 7

  buttonDown(key: number) {
    this.state[key] = 0x41;
  }

  buttonUp(key: number) {
    this.state[key] = 0x40;
  }
}

export default Controller