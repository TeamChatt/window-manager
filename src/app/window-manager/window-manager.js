import React from 'react'

import Window from '/components/window'
import { DesktopItem } from '/components/desktop'
import { WindowManager, WindowManagerFrame } from '/components/window-manager'
import { TaskbarButton } from '/components/taskbar'
import { IconPause } from '/components/icon'

import background from './touhou-wings.jpg'
import folder from './folder.png'


const WindowManagerApp = () => {
  const windows = (
    <>
      <WindowManagerFrame>
        <Window />
      </WindowManagerFrame>
    </>
  )
  const desktopItems = (
    <>
      <DesktopItem icon={folder} label="Recycle Bin"/>
      <DesktopItem icon={folder} label="Pictures"/>
      <DesktopItem icon={folder} label="Music"/>
      <DesktopItem icon={folder} label="Documents"/>
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
