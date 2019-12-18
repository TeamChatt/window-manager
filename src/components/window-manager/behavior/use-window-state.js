import { useReducer, useRef } from 'react'
import { pathLens, modifyAt } from '/utils/lenses'

const defaultWindowActions = (actions, id) => ({
  onMinimize: () => actions.minimizeWindow(id),
  onClose:    () => actions.closeWindow(id),
  onToggle:   () => actions.toggleWindow(id),
})
const withDefaultActions = (actions, id, windowState) => ({
  ...defaultWindowActions(actions, id),
  ...windowState,
})
const normalizeWindowState = actions => state => {
  const normalize = id => {
    const lens = pathLens(id)
    return modifyAt(lens, s => withDefaultActions(actions, id, s))
  }
  return Object.keys(state)
    .map(normalize)
    .reduce((acc, f) => f(acc), state)
}

const windowReducer = (state, { type, id }) => {
  const lens = pathLens(id, 'state')
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
  const dispatchRef = useRef()
  const actions = {
    openWindow:     id => dispatchRef.current({ type: 'open', id }),
    closeWindow:    id => dispatchRef.current({ type: 'close', id }),
    minimizeWindow: id => dispatchRef.current({ type: 'minimize', id }),
    toggleWindow:   id => dispatchRef.current({ type: 'toggle', id }),
  }
  const [state, dispatch] = useReducer(
    windowReducer,
    initialState(actions),
    normalizeWindowState(actions),
  )
  dispatchRef.current = dispatch
  return [state, actions]
}

export default useWindowState