import React from 'react'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const Window = ({ title, children, className }) => (
  <div className={cx('window', className)}>
    <div className={cx('window_header')}>
      {title}
    </div>
    <div className={cx('window_body')}>
      {children}
    </div>
  </div>
)