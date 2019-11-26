export const idLens = {
  get: (s) => s,
  set: (s,x) => x,
  name: 'id'
}
export const indexLens = (i) => ({
  get: (s) => s[i],
  set: (s,x) => {
    const clone = [...s]
    clone[i] = x
    return clone
  },
  name: `[${i}]`
})
export const propertyLens = (p) => ({
  get: (s) => s[p],
  set: (s,x) => ({...s, [p]: x}),
  name: `.${p}`
})
export const composeLens = (l1, l2) => ({
  get: (s) => l2.get(l1.get(s)),
  set: (s,x) => {
    const inner = l1.get(s)
    return l1.set(s, l2.set(inner, x))
  },
  name: `${l1.name} ${l2.name}`
})
export const emptyLens = {
  get: () => undefined,
  set: (s) => s,
  name: 'empty'
}
export const safeLens = (lens,d) => ({
  get: (s) => {
    const x = lens.get(s)
    return x === undefined ? d : x
  },
  set: lens.set,
  name: `safe(${lens.name})`
})
