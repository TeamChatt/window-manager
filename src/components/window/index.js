import React from 'react'

import styles from './index.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const Window = ({ title, children }) => (
  <div className={cx('window')}>
    <div className={cx('window_header')}>
      {title}
    </div>
    <div className={cx('window_body')}>
      {children}
    </div>
  </div>
)

export default Window
