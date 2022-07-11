import React, { createContext, ReactNode, useContext } from 'react'

import { Manager } from '~/src/components/manager'
import { AnimationContainer } from '~/src/components/generic/animation'
import { BSODErrorBoundary } from '~/src/components/blue-screen-of-death'
import { WMWindow } from './window'
import { WMTaskbarButton } from './taskbar-button'
import { WindowActions, WindowState } from './behavior/use-window-state'

type WindowProps = {
  id: string
  content: ReactNode
  title: string
  actions: WindowActions
  state: WindowState
}

const WindowContext = createContext<WindowProps[]>([])

export const useWindowContext = () => useContext(WindowContext)

type WindowManagerProps = {
  background: string
  backgroundPosition?: string
  themeColor: 'blue' | 'silver'
  windows: WindowProps[]
  desktopItems: ReactNode
  taskbarExtras?: ReactNode
}
export const WindowManager = ({
  background,
  backgroundPosition,
  themeColor,
  windows,
  desktopItems,
  taskbarExtras,
}: WindowManagerProps) => {
  const windowItems = windows.map(({ id, title, content, state, actions }) => (
    <WMWindow
      key={id}
      id={id}
      title={title}
      visibility={state.visibility}
      order={state.order}
      position={state.position}
      dimensions={state.dimensions}
      isFocused={state.isFocused}
      onMinimize={actions.minimize}
      onClose={actions.close}
      onFocus={actions.focus}
      onBlur={actions.blur}
      onMove={actions.move}
    >
      {content}
    </WMWindow>
  ))
  const taskbarItems = windows.map(
    ({ id, title, state, actions }) =>
      state.visibility !== 'closed' && (
        <WMTaskbarButton
          key={id}
          id={id}
          active={state.visibility === 'open' && state.isFocused}
          hasOutline={state.visibility === 'minimized'}
          onClick={
            state.visibility === 'open' && state.order === windows.length
              ? actions.minimize
              : actions.open
          }
        >
          {title}
        </WMTaskbarButton>
      )
  )

  return (
    <BSODErrorBoundary>
      <AnimationContainer>
        <WindowContext.Provider value={windows}>
          <Manager
            background={background}
            backgroundPosition={backgroundPosition}
            themeColor={themeColor}
            desktopItems={desktopItems}
            windowItems={windowItems}
            taskbarItems={taskbarItems}
            taskbarExtras={taskbarExtras}
          />
        </WindowContext.Provider>
      </AnimationContainer>
    </BSODErrorBoundary>
  )
}
