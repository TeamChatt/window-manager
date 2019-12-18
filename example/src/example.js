import React, { useReducer } from 'react'
import { pathLens, modifyAt } from '../../src/utils/lenses'
import {
  WindowManager,
  WMWindow,
  WMTaskbarButton,
  WMFileGridItem,
} from 'window-manager'

import background from '../images/touhou-wings.jpg'
import folder from '../images/folder.png'

const initialWindowState = {
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
}
const windowReducer = (state, { type, id }) => {
  const lens = pathLens(id, 'state')
  switch(type) {
    case 'open':     return modifyAt(lens, state, () => 'open')
    case 'minimize': return modifyAt(lens, state, () => 'minimized')
    case 'close':    return modifyAt(lens, state, () => 'closed')
    case 'toggle':   return modifyAt(lens, state, s => s === 'open' ? 'minimized' : 'open')
  }
}
const useWindowState = (initialState = initialWindowState) => {
  const [state, dispatch] = useReducer(windowReducer, initialState)
  return [state, dispatch]
}

const ExampleApp = () => {
  const [windowState, dispatch] = useWindowState()
  const windowEntries = Object.entries(windowState)

  const windows = windowEntries.map(
    ([id, { title, state, UI }]) =>
      state === 'open' && (
        <WMWindow
          key={id}
          id={id}
          title={title}
          onMinimize={() => dispatch({ type: 'minimize', id })}
          onClose={() => dispatch({ type: 'close', id })}
        >
          {UI}
        </WMWindow>
      )
  )
  const taskbarItems = windowEntries.map(
    ([id, { title, state }]) =>
      state !== 'closed' && (
        <WMTaskbarButton
          key={id}
          id={id}
          active={state === 'open'}
          hasOutline={state === 'minimized'}
          onClick={() => dispatch({ type: 'toggle', id })}
        >
          {title}
        </WMTaskbarButton>
      )
  )

  const desktopItems = (
    <>
      <WMFileGridItem 
        icon={folder}
        label="Pictures"
        id="pictures"
        hasOutline={windowState.pictures.state === 'closed'}
        onDoubleClick={() => dispatch({ type: 'open', id: 'pictures' })}
      />
      <WMFileGridItem 
        icon={folder}
        label="Music"
        id="music"
        hasOutline={windowState.music.state === 'closed'}
        onDoubleClick={() => dispatch({ type: 'open', id: 'music' })}
      />
    </>
  )

  return (
    <WindowManager
      background={background}
      desktopItems={desktopItems}
      taskbarItems={taskbarItems}
      windows={windows}
    />
  )
}

export default ExampleApp
