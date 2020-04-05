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
    chat: {
      visibility: 'open',
      isFocused: true,
      position: {
        top: 50,
        left: 200,
        width: 600,
        height: '80vh',
      },
    },
    pictures: {
      visibility: 'closed',
      position: {
        top: 80,
        left: 300,
        width: 600,
        height: '50vh',
      },
    },
    music: {
      visibility: 'closed',
      position: {
        top: 110,
        left: 400,
        width: 600,
        height: '50vh',
      },
    },
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
        onDoubleClick={windowActions.pictures.open}
      />
      <WMFileGridItem
        icon={folder}
        label="Music"
        id="music"
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
