import { useReducer } from 'react'
import { pathLens, modifyAt } from '/utils/lenses'

const mapObject = (obj, f) => {
  const app = key => {
    const lens = pathLens(key)
    return modifyAt(lens, value => f(key, value))
  }
  return Object.keys(obj)
    .map(app)
    .reduce((acc, f) => f(acc), obj)
}

const windowReducer = (state, { type, id }) => {
  const lens = pathLens(id)
  switch (type) {
    case 'open':
      return modifyAt(lens, () => 'open')(state)
    case 'minimize':
      return modifyAt(lens, () => 'minimized')(state)
    case 'close':
      return modifyAt(lens, () => 'closed')(state)
    case 'toggle':
      return modifyAt(lens, s => (s === 'open' ? 'minimized' : 'open'))(state)
  }
}

const useWindowState = initialState => {
  const [state, dispatch] = useReducer(
    windowReducer,
    initialState,
  )
  const actions = mapObject(state, id => ({
    open:     () => dispatch({ type: 'open', id }),
    close:    () => dispatch({ type: 'close', id }),
    minimize: () => dispatch({ type: 'minimize', id }),
    toggle:   () => dispatch({ type: 'toggle', id }),
  }))
  return [state, actions]
}

export default useWindowState