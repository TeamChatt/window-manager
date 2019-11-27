class Defer {
  constructor() {
    this._promise = new Promise(resolve => {
      this._resolve = resolve
    })
  }
  static create() {
    return new Defer()
  }
  resolve(...args) {
    this._resolve(...args)
  }
  then(...args) {
    return this._promise.then(...args)
  }
  catch(...args) {
    return this._promise.catch(...args)
  }
}

export default Defer.create
