import React, { useState } from 'react'
import {
  useWindowState,
  WindowManager,
  WMFileGridItem,
  WMFileGrid,
} from 'window-manager'

import background from '../images/touhou-wings.jpg'
import folder from '../images/folder.png'
import image from '../images/image.png'

import picture1 from '../images/avatar-01.png'
import picture2 from '../images/avatar-02.png'
import picture3 from '../images/avatar-03.png'

const PicturesFolder = ({ onOpenPicture }) => (
  <WMFileGrid>
    <WMFileGridItem
      icon={image}
      label="picture-1.jpg"
      id="picture1"
      onDoubleClick={() => onOpenPicture('picture1', picture1)}
    />
    <WMFileGridItem
      icon={image}
      label="picture-2.jpg"
      id="picture2"
      onDoubleClick={() => onOpenPicture('picture2', picture2)}
    />
    <WMFileGridItem
      icon={image}
      label="picture-3.png"
      id="picture3"
      onDoubleClick={() => onOpenPicture('picture3', picture3)}
    />
  </WMFileGrid>
)

const PictureWindow = ({ picture }) => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 200,
      background: 'black'
    }}
  >
    <img src={picture} alt="" />
  </div>
)

const ExampleApp = () => {
  const [count, setCount] = useState(0)
  const counter = (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>{count}</button>
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
  })

  const openPictureWindow = (id, picture) => {
    windowActions.openWindow(id, {
      data: { picture },
      position: {
        top: 90,
        left: 320,
        width: 'auto',
        height: 'auto',
      },
    })
  }
  const openPicturesFolder = () => {
    windowActions.openWindow('pictures', {
      position: {
        top: 80,
        left: 300,
        width: 600,
        height: '50vh',
      },
    })
  }
  const openMusicFolder = () => {
    windowActions.openWindow('music', {
      position: {
        top: 110,
        left: 400,
        width: 600,
        height: '50vh',
      },
    })
  }

  const renderWindow = ({ id, state }) => {
    switch (id) {
      case 'chat':
        return {
          title: 'Chat',
          content: counter,
        }
      case 'pictures':
        return {
          title: 'Pictures',
          content: <PicturesFolder onOpenPicture={openPictureWindow} />,
        }
      case 'music':
        return {
          title: 'Music',
          content: <div>Music</div>,
        }
      case 'picture1':
      case 'picture2':
      case 'picture3':
        return {
          title: 'Picture',
          content: <PictureWindow picture={state.data.picture} />,
        }
    }
  }

  const windows = Object.keys(windowState).map(id => {
    const state = windowState[id]
    const actions = windowActions.window[id]
    
    const window = renderWindow({ id, state, actions })
    return {
      id,
      state,
      actions,
      ...window,
    }
  })

  const desktopItems = (
    <>
      <WMFileGridItem
        icon={folder}
        label="Pictures"
        id="pictures"
        onDoubleClick={openPicturesFolder}
      />
      <WMFileGridItem
        icon={folder}
        label="Music"
        id="music"
        onDoubleClick={openMusicFolder}
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
