import React from 'react'

import Window from '/components/window'
import { WindowManager, WindowManagerFrame } from '/components/window-manager'
import { TaskbarButton } from '/components/taskbar'
import { IconPause } from '/components/icon'
import background from './touhou-wings.jpg'


const WindowManagerApp = () => {
  const controls = (
    <>
      <TaskbarButton borderless name={'pause'} onClick={() => {}}>
        <IconPause color="white"/>
      </TaskbarButton>
    </>
  )

  return (
    <>
      <WindowManager controls={controls} background={background}>
        <WindowManagerFrame>
          <Window />
        </WindowManagerFrame>
      </WindowManager>
    </>
  )
}

export default WindowManagerApp
