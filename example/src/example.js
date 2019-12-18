import React, { useReducer, useRef } from 'react'
import { pathLens, modifyAt } from '../../src/utils/lenses'
import { WindowManager, WMFileGridItem } from 'window-manager'

import background from '../images/touhou-wings.jpg'
import folder from '../images/folder.png'

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
    normalizeWindowState(actions)
  )
  dispatchRef.current = dispatch
  return [state, actions]
}

const initialWindowState = () => ({
  chat: {
    state: 'open',
    title: 'Chat',
    UI: <div>Chat</div>,
  },
  pictures: {
    state: 'closed',
    title: 'Pictures',
    UI: <div>Pictures</div>,
  },
  music: {
    state: 'closed',
    title: 'Music',
    UI: <div>Music</div>,
  },
})
const ExampleApp = () => {
  const [windowState, actions] = useWindowState(initialWindowState)

  const desktopItems = (
    <>
      <WMFileGridItem
        icon={folder}
        label="Pictures"
        id="pictures"
        hasOutline={windowState.pictures.state === 'closed'}
        onDoubleClick={() => actions.openWindow('pictures')}
      />
      <WMFileGridItem
        icon={folder}
        label="Music"
        id="music"
        hasOutline={windowState.music.state === 'closed'}
        onDoubleClick={() => actions.openWindow('music')}
      />
    </>
  )

  return (
    <WindowManager
      background={background}
      desktopItems={desktopItems}
      windowState={windowState}
      actions={actions}
    />
  )
}

export default ExampleApp
