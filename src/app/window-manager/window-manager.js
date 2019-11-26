import React from 'react'

import { Window } from '/components/window'
import { FileGridItem } from '/components/file-grid'
import { WindowManager, WindowManagerFrame } from '/components/window-manager'
import { TaskbarButton } from '/components/taskbar'
import { IconPause } from '/components/icon'

import background from './touhou-wings.jpg'
import folder from './folder.png'


const WindowManagerApp = () => {
  const windows = (
    <>
      <WindowManagerFrame>
        <Window title="Chat" />
      </WindowManagerFrame>
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
      <TaskbarButton borderless name={'pause'} onClick={() => {}}>
        <IconPause color="white"/>
      </TaskbarButton>
    </>
  )

  return (
    <WindowManager background={background} desktopItems={desktopItems} taskbarItems={taskbarItems} windows={windows} />
  )
}

export default WindowManagerApp
