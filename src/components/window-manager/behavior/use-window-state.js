import { useMemo, useReducer } from 'react'
import { pathLens, modifyAt } from '/utils/lenses'
import reorder from '/utils/reorder'

const mapObject = (obj, f) => {
  const app = (key, i) => {
    const lens = pathLens(key)
    return modifyAt(lens, value => f(key, value, i))
  }
  return Object.keys(obj)
    .map(app)
    .reduce((acc, f) => f(acc), obj)
}

const topWindow = state => {
  const windows = Object.entries(state)
  const [topId] = windows
    .filter(([, window]) => window.visibility === 'open')
    .sort(([, window1], [, window2]) => window1.order - window2.order)
    .pop() || []
  return topId
}
const reorderWindows = (from, to) => state => {
  const reorderWindow = modifyAt(pathLens('order'), reorder(from, to))
  return mapObject(state, (key, window) => reorderWindow(window))
}


const initialize = state => {
  const initializeWindow = (key, window, i) => ({
    order: i+1,
    position: {
      top: 50,
      left: 200 + i * 100,
      width: 960,
      height: '80vh',
    },
    ...window,
  })
  return mapObject(state, initializeWindow)
}

const windowReducer = (state, { type, id, position }) => {
  const visibilityLens = pathLens(id, 'visibility')
  const positionLens   = pathLens(id, 'position')
  const focusLens      = pathLens(id, 'isFocused')
  switch (type) {
    case 'open':
      return visibilityLens.set(state, 'open')
    case 'minimize':
      return visibilityLens.set(state, 'minimized')
    case 'close':
      return visibilityLens.set(state, 'closed')
    case 'focus': 
      return focusLens.set(state, true)
    case 'blur':
      return focusLens.set(state, false)
    case 'move':
      return modifyAt(positionLens, oldPosition => ({
        ...oldPosition,
        ...position,
      }))(state)
    case 'bringToFront': {
      const from = state[id].order
      const to   = Object.keys(state).length
      return reorderWindows(from, to)(state)
    }
    case 'focusNext': {
      const topId = topWindow(state)
      return topId
        ? pathLens(topId, 'isFocused').set(state, true)
        : state
    }
  }
}

const useWindowState = initialState => {
  const [state, dispatch] = useReducer(
    windowReducer,
    initialState,
    initialize,
  )
  // TODO: need to recompute if number of windows changes dynamically
  const actions = useMemo(() => mapObject(state, id => ({
    open: () => {
      dispatch({ type: 'open', id })
      dispatch({ type: 'bringToFront', id })
      dispatch({ type: 'focus', id })
    },
    focus: () => {
      dispatch({ type: 'bringToFront', id })
      dispatch({ type: 'focus', id })
    },
    close: () => {
      dispatch({ type: 'close', id })
      dispatch({ type: 'focusNext' })
    },
    minimize: () => {
      dispatch({ type: 'minimize', id })
      dispatch({ type: 'focusNext' })
    },
    blur: () => dispatch({ type: 'blur', id }),
    move: (position) => dispatch({ type: 'move', id, position }),
  })), [])
  return [state, actions]
}

export default useWindowState