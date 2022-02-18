import { Defer, defer } from '~/src/utils/defer'
import { frame } from '~/src/utils/wait'

class AsyncMap<K, V> {
  map: Map<K, Defer<V>>

  constructor() {
    this.map = new Map()
  }

  ensureKey(key: K) {
    if (!this.map.has(key)) {
      this.map.set(key, defer())
    }
    return this.map.get(key)!
  }
  async get(key: K) {
    return Promise.race([this.ensureKey(key), frame().then(() => false)])
  }
  async set(key: K, value: V) {
    this.ensureKey(key).resolve(value)
    await frame()
    this.map.delete(key)
  }
}

class AnimationCoordinator<K, V> {
  inMap: AsyncMap<K, V>
  outMap: AsyncMap<K, V>

  constructor() {
    this.inMap = new AsyncMap()
    this.outMap = new AsyncMap()
  }
  static create<K, V>() {
    return new AnimationCoordinator<K, V>()
  }

  async in(id: K, ref: V) {
    this.inMap.set(id, ref)
    return this.outMap.get(id)
  }
  async out(id: K, ref: V) {
    this.outMap.set(id, ref)
    return this.inMap.get(id)
  }
}

export type AnimationCoordinatorT<K, V> = AnimationCoordinator<K, V>

export const makeAnimationCoordinator = <K, V>() =>
  AnimationCoordinator.create<K, V>()
