const add = function (a, b) {
  return a + b
}

const mul = function (a, b) {
  return a * b
}

class People {
  constructor(options = {}) {
    this.name = options.name
    this.sex = options.sex
  }
  say() {
    console.log(this.name + '你好')
  }
}

export { add, mul, People }
