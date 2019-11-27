import React, { useRef, useState } from 'react'
import { frame } from '/utils/frame'

import { useDeferredAnimation } from '/components/generic/animation'
import { Window } from '/components/window'
import { FileGridItem } from '/components/file-grid'
import { WindowManager, WindowManagerFrame, WindowManagerOutline } from '/components/window-manager'
import { TaskbarButton } from '/components/taskbar'

import background from './touhou-wings.jpg'
import folder from './folder.png'

const rect = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const flipRect = (fromEl, toEl) => {
  const fromRect = fromEl.getBoundingClientRect()
  const toRect   = toEl.getBoundingClientRect()
  return flipPosition(fromRect, toRect)
}
const flipPosition = (from, to) => ({
  top:      from.top    - to.top,
  left:     from.left   - to.left,
  bottom: -(from.bottom - to.bottom),
  right:  -(from.right  - to.right),
})

const makeCSSAnimation = (receive) => async (from, to) => {
  receive.setup(from, to)
  await frame()
  await receive.run(from, to)
  receive.teardown(from, to)
}

const WindowManagerApp = () => {
  const [showChatWindow, setShowChatWindow] = useState(true)
  const toggleShowChatWindow = () => {
    setShowChatWindow(show => !show)
  }
  
  const windowRef = useRef()
  const [windowRect, setWindowRect] = useState(rect)
  const [animateWindow, setAnimateWindow] = useState(false)

  const taskbarItemRef = useRef()
  const [taskbarRect, setTaskbarRect] = useState(rect)
  const [animateTaskbar, setAnimateTaskbar] = useState(false)
  
  const sendObject = () => {}
  const receiveWindow = makeCSSAnimation({
    setup: (from, to) => {
      const newRect = flipRect(from.current, to.current)
      setWindowRect(newRect)
      setAnimateWindow(false)
    },
    run: (from) => {
      setWindowRect(rect)
      setAnimateWindow(true)
      return new Promise(resolve => from.current.addEventListener('transitionend', resolve))
    },
    teardown: () => {
      setAnimateWindow(false)
    },
  })
  const receiveTaskbar = makeCSSAnimation({
    setup: (from, to) => {
      const newRect = flipRect(from.current, to.current)
      setTaskbarRect(newRect)
      setAnimateTaskbar(false)
    },
    run: (from) => {
      setTaskbarRect(rect)
      setAnimateTaskbar(true)
      return new Promise(resolve => from.current.addEventListener('transitionend', resolve))
    },
    teardown: () => {
      setAnimateTaskbar(false)
    },
  })

  useDeferredAnimation('chat', windowRef, showChatWindow, sendObject, receiveWindow)
  useDeferredAnimation('chat', taskbarItemRef, !showChatWindow, sendObject, receiveTaskbar)

  const chatWindow = (
    <WindowManagerFrame>
      <Window title="Chat" />
      <WindowManagerOutline ref={windowRef} rect={windowRect} animate={animateWindow} />
    </WindowManagerFrame>
  )

  const windows = (
    <>
      {chatWindow}
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
      <TaskbarButton active={showChatWindow} onClick={toggleShowChatWindow}>
        Chat
        <WindowManagerOutline ref={taskbarItemRef} rect={taskbarRect} animate={animateTaskbar} />
      </TaskbarButton>
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

export default WindowManagerApp
