import React from 'react'

import { Desktop } from '/components/desktop'
import { Taskbar } from '/components/taskbar'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const WindowManager = ({ background, windows, desktopItems, taskbarItems }) => (
  <div className={cx('window-manager')}>
    <div className={cx('window-manager_layer-group')}>
      <div className={cx('window-manager_layer')}>
        <Desktop background={background}>
          {desktopItems}
        </Desktop>
      </div>
      <div className={cx('window-manager_layer')}>
        {windows}
      </div>
    </div>
    <Taskbar>{taskbarItems}</Taskbar>
  </div>
)