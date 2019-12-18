import React, { useState } from 'react'
import { useWindowState, WindowManager, WMFileGridItem } from 'window-manager'

import background from '../images/touhou-wings.jpg'
import folder from '../images/folder.png'

const ExampleApp = () => {
  const [count, setCount] = useState(0)
  const counter = (
    <div>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  )

  const [windowState, windowActions] = useWindowState({
    chat: 'open',
    pictures: 'closed',
    music: 'closed',
  })

  const windows = [
    {
      id: 'chat',
      title: 'Chat',
      content: counter,
      state: windowState.chat,
      actions: windowActions.chat,
    },
    {
      id: 'pictures',
      title: 'Pictures',
      content: <div>Pictures</div>,
      state: windowState.pictures,
      actions: windowActions.pictures,
    },
    {
      id: 'music',
      title: 'Music',
      content: <div>Music</div>,
      state: windowState.music,
      actions: windowActions.music,
    },
  ]

  const desktopItems = (
    <>
      <WMFileGridItem
        icon={folder}
        label="Pictures"
        id="pictures"
        hasOutline={windowState.pictures === 'closed'}
        onDoubleClick={windowActions.pictures.open}
      />
      <WMFileGridItem
        icon={folder}
        label="Music"
        id="music"
        hasOutline={windowState.music === 'closed'}
        onDoubleClick={windowActions.music.open}
      />
    </>
  )

  return (
    <WindowManager
      background={background}
      desktopItems={desktopItems}
      windows={windows}
    />
  )
}

export default ExampleApp
