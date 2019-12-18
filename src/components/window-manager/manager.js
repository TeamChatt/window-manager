import React from 'react'

import { AnimationContainer } from '/components/generic/animation'
import { FileGrid } from '/components/file-grid'
import { Desktop } from '/components/desktop'
import { Taskbar } from '/components/taskbar'
import { BSODErrorBoundary } from '/components/blue-screen-of-death'
import { WMWindow } from './window'
import { WMTaskbarButton } from './taskbar-button'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const WindowManager = ({
  background,
  windows,
  desktopItems,
  taskbarExtras,
}) => {
  const windowItems = windows.map(
    ({ id, title, state, content, actions }) =>
      state === 'open' && (
        <WMWindow
          key={id}
          id={id}
          title={title}
          onMinimize={actions.minimize}
          onClose={actions.close}
        >
          {content}
        </WMWindow>
      )
  )
  const taskbarItems = windows.map(
    ({ id, title, state, actions }) =>
      state !== 'closed' && (
        <WMTaskbarButton
          key={id}
          id={id}
          active={state === 'open'}
          hasOutline={state === 'minimized'}
          onClick={actions.toggle}
        >
          {title}
        </WMTaskbarButton>
      )
  )

  return (
    <BSODErrorBoundary>
      <AnimationContainer>
        <div className={cx('window-manager')}>
          <div className={cx('window-manager_layer-group')}>
            <div className={cx('window-manager_layer')}>
              <Desktop background={background}>
                <FileGrid>{desktopItems}</FileGrid>
              </Desktop>
            </div>
            <div className={cx('window-manager_layer')}>{windowItems}</div>
          </div>
          <Taskbar>
            {taskbarItems}
            {taskbarExtras}
          </Taskbar>
        </div>
      </AnimationContainer>
    </BSODErrorBoundary>
  )
}
