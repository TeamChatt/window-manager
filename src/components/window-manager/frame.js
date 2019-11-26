import React from 'react'

import styles from './frame.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const WindowManagerFrame = ({ children }) => (
  <div className={cx('window-manager-frame')}>
    {children}
  </div>
)

export default WindowManagerFrame
