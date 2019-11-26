import React from 'react'

import styles from './frame.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const WindowManagerFrame = ({ children }) => (
  <div className={cx('window-manager-frame')}>
    {children}
  </div>
)