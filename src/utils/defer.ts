class Deferred<T> {
  private _promise: Promise<T>
  private _resolve: (t: T) => void

  constructor() {
    this._promise = new Promise((resolve) => {
      this._resolve = resolve
    })
  }
  static create<T>() {
    return new Deferred<T>()
  }
  resolve(t: T) {
    this._resolve(t)
  }
  then(...args) {
    return this._promise.then(...args)
  }
  catch(...args) {
    return this._promise.catch(...args)
  }
}

export type Defer<T> = Deferred<T>
export const defer = <T>() => Deferred.create<T>()
