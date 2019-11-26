import React from 'react'

import Window from '/components/window'
import { WindowManager, WindowManagerFrame } from '/components/window-manager'
import { TaskbarButton } from '/components/taskbar'
import { IconPause } from '/components/icon'

const ChatGame = () => {
  const controls = (
    <>
      <TaskbarButton borderless name={'pause'} onClick={() => {}}>
        <IconPause color="white"/>
      </TaskbarButton>
    </>
  )

  return (
    <>
      <WindowManager controls={controls} desktopState={{}}>
        <WindowManagerFrame>
          <Window />
        </WindowManagerFrame>
      </WindowManager>
    </>
  )
}

export default ChatGame
