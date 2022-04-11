import { useMemo, useReducer } from 'react'
import { pathLens, modifyAt } from '~/src/utils/lenses'
import { reorder } from '~/src/utils/reorder'

type WindowID = string
type WindowPosition = { top: number; left: number }

export interface WindowState {
  visibility: 'open' | 'closed' | 'minimized'
  order: number
  data?: any
  position: WindowPosition
  dimensions?: { width: string | number; height: string | number }
  isFocused: boolean
}
export interface WindowActions {
  open: () => void
  focus: () => void
  close: () => void
  minimize: () => void
  blur: () => void
  move: (position: WindowPosition) => void
}

type WindowsState = {
  [K in WindowID]: WindowState
}
type WindowsStatePartial = {
  [K in WindowID]: Partial<WindowState>
}
type WindowsActions = {
  createWindow: (id: WindowID, window: any) => void
  destroyWindow: (id: WindowID) => void
  openWindow: (id: WindowID, window: any) => void
  closeWindow: (id: WindowID) => void
  reset: (state: WindowsStatePartial) => void
  window: {
    [K in WindowID]: WindowActions
  }
}

const mapObject = <T, S>(
  obj: { [K in string]: T },
  f: (key: string, t: T, i: number) => S
): { [K in string]: S } => {
  const app = (key: string, i: number) => {
    const lens = pathLens(key)
    return modifyAt(lens, (value) => f(key, value, i))
  }
  return Object.keys(obj)
    .map(app)
    .reduce((acc, f) => f(acc), obj)
}

const topWindow = (state: WindowsState) => {
  const windows = Object.entries(state)
  const [topId] =
    windows
      .filter(([, window]) => window.visibility === 'open')
      .sort(([, window1], [, window2]) => window1.order - window2.order)
      .pop() || []
  return topId
}
const reorderWindows = (from: number, to: number) => (state: WindowsState) => {
  const reorderWindow = modifyAt(pathLens('order'), reorder(from, to))
  return mapObject(state, (key, window) => reorderWindow(window))
}
const autoPosition = (state: WindowsState) => {
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

const initializeWindow = (
  key: string,
  window: Partial<WindowState>,
  i: number
): WindowState => ({
  position: {
    top: 50 + i * 50,
    left: 200 + i * 100,
  },
  visibility: 'closed',
  isFocused: false,
  ...window,
  order: i + 1,
})
const initialize = (state: WindowsState): WindowsState =>
  mapObject(state, initializeWindow)

const reducer = (state: WindowsState, action): WindowsState => {
  if (action.type.startsWith('window.')) {
    return windowReducer(state, action)
  }
  if (action.type.startsWith('top.')) {
    return topReducer(state, action)
  }
  return state
}
const topReducer = (state: WindowsState, { type, id, window, newState }) => {
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
    case 'top.focusNext': {
      const topId = topWindow(state)
      return topId ? pathLens(topId, 'isFocused').set(state, true) : state
    }
    case 'top.reset': {
      return initialize(newState)
    }
  }
}
const windowReducer = (state: WindowsState, action) => {
  const visibilityLens = pathLens(action.id, 'visibility')
  const positionLens = pathLens(action.id, 'position')
  const focusLens = pathLens(action.id, 'isFocused')
  switch (action.type) {
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
      return modifyAt(positionLens, (oldPosition) => ({
        ...oldPosition,
        ...action.position,
      }))(state)
    case 'window.bringToFront': {
      const top = topWindow(state)
      const from = state[action.id].order
      const to = top ? state[top].order : from
      return reorderWindows(from, to)(state)
    }
  }
}

export const useWindowState = (
  initialState: WindowsStatePartial
): [WindowsState, WindowsActions] => {
  const [state, dispatch] = useReducer(reducer, initialState, initialize)

  // Window actions
  const windowActions = (id: WindowID): WindowActions => ({
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
      dispatch({ type: 'top.focusNext' })
    },
    minimize: () => {
      dispatch({ type: 'window.minimize', id })
      dispatch({ type: 'top.focusNext' })
    },
    blur: () => dispatch({ type: 'window.blur', id }),
    move: (position) => dispatch({ type: 'window.move', id, position }),
  })

  // Top-level actions
  const createWindow = (id: WindowID, window) => {
    if (state[id] === undefined) {
      dispatch({ type: 'top.create', id, window })
    }
  }
  const destroyWindow = (id: WindowID) => {
    if (state[id] !== undefined) {
      dispatch({ type: 'top.destroy', id })
      dispatch({ type: 'top.focusNext' })
    }
  }
  const openWindow = async (id: WindowID, window) => {
    if (state[id] === undefined) {
      createWindow(id, window)
      setTimeout(() => {
        windowActions(id).open()
      }, 0)
    } else {
      windowActions(id).open()
    }
  }
  const closeWindow = (id: WindowID) => {
    if (state[id] !== undefined) {
      windowActions(id).close()
    }
  }
  const reset = (state: WindowsStatePartial) => {
    dispatch({ type: 'top.reset', newState: state })
  }

  const numWindows = Object.keys(state).length
  const actions = {
    createWindow,
    destroyWindow,
    openWindow,
    closeWindow,
    reset,
    window: useMemo(() => mapObject(state, windowActions), [numWindows]),
  }

  return [state, actions]
}
