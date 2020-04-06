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
const autoPosition = (state) => {
  const topId = topWindow(state) || -1
  const topPosition = pathLens(topId, 'position').get(state)
  return topPosition
    ? {
        left: topPosition.left + 40,
        top: topPosition.top + 20,
      }
    : {
        left: 200,
        top: 100,
      }
}


const initializeWindow = (key, window, i) => ({
  position: {
    top: 50 + i * 50,
    left: 200 + i * 100,
  },
  visibility: 'closed',
  ...window,
  order: i+1,
})
const initialize = state => {
  return mapObject(state, initializeWindow)
}


const reducer = (state, action) => {
  if (action.type.startsWith('window.')) {
    return windowReducer(state, action)
  }
  if (action.type.startsWith('top.')) {
    return topReducer(state, action)
  }
  return state
}
const topReducer = (state, { type, id, window }) => {
  const windowLens = pathLens(id)
  switch (type) {
    case 'top.create': {
      const order = Object.keys(state).length
      const position = autoPosition(state)
      const newWindow = initializeWindow(id, { position, ...window }, order)
      return windowLens.set(state, newWindow)
    }
    case 'top.destroy': {
      const newState = { ...state }
      delete newState[id]
      return newState
    }
  }
}
const windowReducer = (state, { type, id, position }) => {
  const visibilityLens = pathLens(id, 'visibility')
  const positionLens   = pathLens(id, 'position')
  const focusLens      = pathLens(id, 'isFocused')
  switch (type) {
    case 'window.open':
      return visibilityLens.set(state, 'open')
    case 'window.minimize':
      return visibilityLens.set(state, 'minimized')
    case 'window.close':
      return visibilityLens.set(state, 'closed')
    case 'window.focus': 
      return focusLens.set(state, true)
    case 'window.blur':
      return focusLens.set(state, false)
    case 'window.move':
      return modifyAt(positionLens, oldPosition => ({
        ...oldPosition,
        ...position,
      }))(state)
    case 'window.bringToFront': {
      const from = state[id].order
      const to   = Object.keys(state).length
      return reorderWindows(from, to)(state)
    }
    case 'window.focusNext': {
      const topId = topWindow(state)
      return topId
        ? pathLens(topId, 'isFocused').set(state, true)
        : state
    }
  }
}

const useWindowState = initialState => {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    initialize,
  )

  // Window actions
  const windowActions = id => ({
    open: () => {
      dispatch({ type: 'window.open', id })
      dispatch({ type: 'window.bringToFront', id })
      dispatch({ type: 'window.focus', id })
    },
    focus: () => {
      dispatch({ type: 'window.bringToFront', id })
      dispatch({ type: 'window.focus', id })
    },
    close: () => {
      dispatch({ type: 'window.close', id })
      dispatch({ type: 'window.blur', id })
      dispatch({ type: 'window.focusNext' })
    },
    minimize: () => {
      dispatch({ type: 'window.minimize', id })
      dispatch({ type: 'window.focusNext' })
    },
    blur: () => dispatch({ type: 'window.blur', id }),
    move: (position) => dispatch({ type: 'window.move', id, position }),
  })

  // Top-level actions
  const createWindow = (id, window) => {
    if(state[id] === undefined) {
      dispatch({ type: 'top.create', id, window })
    }
  }
  const destroyWindow = (id) => {
    if(state[id] !== undefined) {
      dispatch({ type: 'top.destroy', id })
      dispatch({ type: 'window.focusNext' })
    }
  }
  const openWindow = async (id, window) => {
    if(state[id] === undefined) {
      createWindow(id, window)
      setTimeout(() => {
        windowActions(id).open()
      }, 0)
    } else {
      windowActions(id).open()
    }
  }
  const closeWindow = (id) => {
    if(state[id] !== undefined) {
      windowActions(id).close()
    }
  }

  const numWindows = Object.keys(state).length
  const actions = {
    createWindow,
    destroyWindow,
    openWindow,
    closeWindow,
    window: useMemo(() => mapObject(state, windowActions), [numWindows])
  }

  return [state, actions]
}

export default useWindowState