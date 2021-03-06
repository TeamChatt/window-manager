export const idLens = {
  get: s => s,
  set: (s, x) => x,
  name: 'id',
}
export const indexLens = i => ({
  get: s => s[i],
  set: (s, x) => {
    const clone = [...s]
    clone[i] = x
    return clone
  },
  name: `[${i}]`,
})
export const propertyLens = p => ({
  get: s => s[p],
  set: (s, x) => ({ ...s, [p]: x }),
  name: `.${p}`,
})
export const composeLens = (l1, l2) => ({
  get: s => l2.get(l1.get(s)),
  set: (s, x) => {
    const inner = l1.get(s)
    return l1.set(s, l2.set(inner, x))
  },
  name: `${l1.name} ${l2.name}`,
})
export const emptyLens = {
  get: () => undefined,
  set: s => s,
  name: 'empty',
}
export const safeLens = (lens, d) => ({
  get: s => {
    try {
      return lens.get(s)
    } catch (e) {
      return d
    }
  },
  set: lens.set,
  name: `safe(${lens.name})`,
})
export const pathLens = (...args) => {
  const path = args
    .map(l => (typeof l === 'number' ? indexLens(l) : propertyLens(l)))
    .reduce(composeLens, idLens)
  return safeLens(path, undefined)
}

export const modifyAt = (lens, f) => s => lens.set(s, f(lens.get(s)))
