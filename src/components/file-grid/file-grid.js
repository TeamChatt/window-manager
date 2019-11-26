import React from 'react'

import styles from './file-grid.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const FileGrid = ({ children }) => (
  <div className={cx('file-grid')}>
    {children}
  </div>
)