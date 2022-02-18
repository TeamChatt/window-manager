import React from 'react'

import styles from './taskbar.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const Taskbar = ({ children }) => (
  <div className={cx('taskbar')}>
    {children}
  </div>
)