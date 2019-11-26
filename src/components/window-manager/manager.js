import React from 'react'

import Desktop from '/components/desktop'
import { Taskbar } from '/components/taskbar'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const WindowManager = ({ desktopState, controls, children }) => (
  <div className={cx('window-manager')}>
    <Desktop season={desktopState.season}>
      {children}
    </Desktop>
    <Taskbar>{controls}</Taskbar>
  </div>
)

export default WindowManager
