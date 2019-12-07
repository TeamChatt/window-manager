import React, { useState } from 'react'

import {
  WindowManager,
  WMWindow,
  WMTaskbarButton,
  WMFileGridItem,
} from '/components/window-manager'

import background from './images/touhou-wings.jpg'
import folder from './images/folder.png'

const useWindowState = (initialState = 'closed') => {
  const [state, setState] = useState(initialState)
  const open     = () => setState('open')
  const minimize = () => setState('minimized')
  const close    = () => setState('closed')
  const toggle   = () => setState(s => s === 'open' ? 'minimized' : 'open')
  const action = {
    open,
    minimize,
    close,
    toggle,
  }
  return [state, action]
}

const ExampleApp = () => {
  const [chatWindowState, chatWindowAction]       = useWindowState('open')
  const [pictureWindowState, pictureWindowAction] = useWindowState('closed')
  const [musicWindowState, musicWindowAction]     = useWindowState('closed')

  const chatWindow = (
    <WMWindow
      id="chat"
      title="Chat"
      onMinimize={chatWindowAction.minimize}
      onClose={chatWindowAction.close}
    />
  )
  const pictureWindow = (
    <WMWindow
      id="pictures"
      title="Pictures"
      onMinimize={pictureWindowAction.minimize}
      onClose={pictureWindowAction.close}
    />
  )
  const musicWindow = (
    <WMWindow
      id="music"
      title="Music"
      onMinimize={musicWindowAction.minimize}
      onClose={musicWindowAction.close}
    />
  )

  const windows = (
    <>
      {chatWindowState    === 'open' && chatWindow}
      {pictureWindowState === 'open' && pictureWindow}
      {musicWindowState   === 'open' && musicWindow}
    </>
  )
  const desktopItems = (
    <>
      <WMFileGridItem 
        icon={folder}
        label="Pictures"
        id="pictures"
        hasOutline={pictureWindowState === 'closed'}
        onDoubleClick={pictureWindowAction.open}
      />
      <WMFileGridItem 
        icon={folder}
        label="Music"
        id="music"
        hasOutline={musicWindowState === 'closed'}
        onDoubleClick={musicWindowAction.open}
      />
    </>
  )

  const chatButton = (
    <WMTaskbarButton
      id="chat"
      active={chatWindowState === 'open'}
      hasOutline={chatWindowState === 'minimized'}
      onClick={chatWindowAction.toggle}
    >
      Chat
    </WMTaskbarButton>
  )
  const pictureButton = (
    <WMTaskbarButton
      id="pictures"
      active={pictureWindowState === 'open'}
      hasOutline={pictureWindowState === 'minimized'}
      onClick={pictureWindowAction.toggle}
    >
      Pictures
    </WMTaskbarButton>
  )
  const musicButton = (
    <WMTaskbarButton
      id="music"
      active={musicWindowState === 'open'}
      hasOutline={musicWindowState === 'minimized'}
      onClick={musicWindowAction.toggle}
    >
      Music
    </WMTaskbarButton>
  )
  const taskbarItems = (
    <>
      {chatWindowState    !== 'closed' && chatButton}
      {pictureWindowState !== 'closed' && pictureButton}
      {musicWindowState   !== 'closed' && musicButton}
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
