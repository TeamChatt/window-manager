import React, { createContext, useContext } from 'react'

import { Manager } from '~/src/components/manager'
import { AnimationContainer } from '~/src/components/generic/animation'
import { BSODErrorBoundary } from '~/src/components/blue-screen-of-death'
import { WMWindow } from './window'
import { WMTaskbarButton } from './taskbar-button'

const WindowContext = createContext()

export const useWindowContext = () => useContext(WindowContext)

export const WindowManager = ({
  background,
  windows,
  desktopItems,
  taskbarExtras,
}) => {
  const windowItems = windows.map(
    ({ id, title, content, state, actions }) =>
      state.visibility === 'open' && (
        <WMWindow
          key={id}
          id={id}
          title={title}
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
      )
  )
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
