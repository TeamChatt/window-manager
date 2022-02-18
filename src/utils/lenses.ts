export interface Lens<S, T> {
  get: (s: S) => T
  set: (s: S, x: T) => S
  delete: (s: S) => S
  name?: string
}

export const idLens: Lens<any, any> = {
  get: (s) => s,
  set: (s, x) => x,
  delete: () => undefined,
  name: 'id',
}
export const indexLens = <T>(i: number): Lens<T[], T> => ({
  get: (s) => s[i],
  set: (s, x) => {
    const clone = [...s]
    clone[i] = x
    return clone
  },
  delete: (s) => {
    const clone = [...s]
    delete clone[i]
    return clone
  },
  name: `[${i}]`,
})
export const propertyLens = <S, K extends keyof S>(p: K): Lens<S, S[K]> => ({
  get: (s) => s[p],
  set: (s, x) => ({ ...s, [p]: x }),
  delete: (s) => {
    const clone = { ...s }
    delete clone[p]
    return clone
  },
  name: `.${p}`,
})
export const composeLens = <S, T, U>(
  l1: Lens<S, T>,
  l2: Lens<T, U>
): Lens<S, U> => ({
  get: (s) => l2.get(l1.get(s)),
  set: (s, x) => {
    const inner = l1.get(s)
    return l1.set(s, l2.set(inner, x))
  },
  delete: (s) => {
    const inner = l1.get(s)
    return l1.set(s, l2.delete(inner))
  },
  name: `${l1.name} ${l2.name}`,
})
export const emptyLens: Lens<any, undefined> = {
  get: () => undefined,
  set: (s) => s,
  delete: () => undefined,
  name: 'empty',
}
export const safeLens = <S, T>(lens: Lens<S, T>, d: T): Lens<S, T> => ({
  get: (s) => {
    try {
      return lens.get(s)
    } catch (e) {
      return d
    }
  },
  set: lens.set,
  delete: lens.delete,
  name: `safe(${lens.name})`,
})
export const pathLens = (...args: (string | number)[]) => {
  const path = args
    .map((l) =>
      typeof l === 'number' ? indexLens(l) : propertyLens<any, string>(l)
    )
    .reduce(composeLens, idLens)
  return safeLens(path, undefined)
}
export const composeLenses = (
  first: Lens<any, any>,
  ...lenses: Lens<any, any>[]
): Lens<any, any> => lenses.reduce(composeLens, first)

export const modifyAt =
  <S, T>(lens: Lens<S, T>, f: (t: T) => T) =>
  (s: S) =>
    lens.set(s, f(lens.get(s)))
