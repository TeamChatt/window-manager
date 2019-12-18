import React from 'react'
import { useWindowState, WindowManager, WMFileGridItem } from 'window-manager'

import background from '../images/touhou-wings.jpg'
import folder from '../images/folder.png'

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
