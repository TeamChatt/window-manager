import defer from '/utils/defer'
import frame from '/utils/frame'

class AsyncMap {
  constructor() {
    this.map = new Map()
  }

  ensureKey(key) {
    if(!this.map.has(key)) {
      this.map.set(key, defer())
    }
    return this.map.get(key)
  }
  async get(key) {
    return Promise.race([
      this.ensureKey(key),
      frame().then(() => false),
    ])
  }
  async set(key, value) {
    this.ensureKey(key).resolve(value)
    await frame()
    this.map.delete(key)
  }
}

class AnimationCoordinator {
  constructor() {
    this.inMap = new AsyncMap()
    this.outMap = new AsyncMap()
  }
  static create() {
    return new AnimationCoordinator()
  }
  
  async in(id, ref) {
    this.inMap.set(id, ref)
    return this.outMap.get(id)
  }
  async out(id, ref) {
    this.outMap.set(id, ref)
    return this.inMap.get(id)
  }
}

export default AnimationCoordinator.create