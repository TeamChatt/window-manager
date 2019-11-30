import React, { useState } from 'react'

import { FileGridItem } from '/components/file-grid'
import { WindowManager, WMWindow, WMTaskbarButton } from '/components/window-manager'

import background from './images/touhou-wings.jpg'
import folder from './images/folder.png'

const ExampleApp = () => {
  const [showChatWindow, setShowChatWindow] = useState(true)
  const toggleShowChatWindow = () => {
    setShowChatWindow(show => !show)
  }

  const chatWindow = (
    <WMWindow id="chat" title="Chat" />
  )

  const windows = (
    <>
      {showChatWindow && chatWindow}
    </>
  )
  const desktopItems = (
    <>
      <FileGridItem icon={folder} label="Recycle Bin" />
      <FileGridItem icon={folder} label="Pictures" />
      <FileGridItem icon={folder} label="Music" />
      <FileGridItem icon={folder} label="Documents" />
    </>
  )
  const taskbarItems = (
    <>
      <WMTaskbarButton id="chat" active={showChatWindow} onClick={toggleShowChatWindow}>
        Chat
      </WMTaskbarButton>
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
