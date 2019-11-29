import React from 'react'

import { AnimationContainer } from '/components/generic/animation'
import { FileGrid } from '/components/file-grid'
import { Desktop } from '/components/desktop'
import { Taskbar } from '/components/taskbar'
import { ErrorBoundary } from './error-boundary'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const WindowManager = ({ background, windows, desktopItems, taskbarItems }) => (
  <ErrorBoundary>
    <AnimationContainer>
      <div className={cx('window-manager')}>
        <div className={cx('window-manager_layer-group')}>
          <div className={cx('window-manager_layer')}>
            <Desktop background={background}>
              <FileGrid>{desktopItems}</FileGrid>
            </Desktop>
          </div>
          <div className={cx('window-manager_layer')}>
            {windows}
          </div>
        </div>
        <Taskbar>{taskbarItems}</Taskbar>
      </div>
    </AnimationContainer>
  </ErrorBoundary>
)