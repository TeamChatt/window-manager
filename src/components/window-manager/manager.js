import React from 'react'

import Desktop from '/components/desktop'
import { Taskbar } from '/components/taskbar'

import styles from './manager.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const WindowManager = ({ background, controls, children }) => (
  <div className={cx('window-manager')}>
    <Desktop background={background}>
      {children}
    </Desktop>
    <Taskbar>{controls}</Taskbar>
  </div>
)

export default WindowManager
