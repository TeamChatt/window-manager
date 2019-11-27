import defer from '/utils/defer'
import { frame } from '/utils/frame'

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
  
  async in(label, ref) {
    this.inMap.set(label, ref)
    return this.outMap.get(label)
  }
  async out(label, ref) {
    this.outMap.set(label, ref)
    return this.inMap.get(label)
  }
}

export default AnimationCoordinator.create