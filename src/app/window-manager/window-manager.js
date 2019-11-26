import React, { useState } from 'react'

import { Window } from '/components/window'
import { FileGridItem } from '/components/file-grid'
import { WindowManager, WindowManagerFrame } from '/components/window-manager'
import { TaskbarButton } from '/components/taskbar'

import background from './touhou-wings.jpg'
import folder from './folder.png'

const WindowManagerApp = () => {
  const [showChatWindow, setShowChatWindow] = useState(true)
  const toggleShowChatWindow = () => {
    setShowChatWindow(show => !show)
  }

  const chatWindow = (
    <WindowManagerFrame>
      <Window title="Chat" />
    </WindowManagerFrame>
  )

  const windows = (
    <>
      {showChatWindow && chatWindow}
    </>
  )
  const desktopItems = (
    <>
      <FileGridItem icon={folder} label="Recycle Bin"/>
      <FileGridItem icon={folder} label="Pictures"/>
      <FileGridItem icon={folder} label="Music"/>
      <FileGridItem icon={folder} label="Documents"/>
    </>
  )
  const taskbarItems = (
    <>
      <TaskbarButton active={showChatWindow} onClick={toggleShowChatWindow}>
        Chat
      </TaskbarButton>
    </>
  )

  return (
    <WindowManager background={background} desktopItems={desktopItems} taskbarItems={taskbarItems} windows={windows} />
  )
}

export default WindowManagerApp
