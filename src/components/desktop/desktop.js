import React from 'react'

import { FileGrid } from '/components/file-grid'
import styles from './desktop.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const Desktop = ({ background, children }) => (
  <div className={cx('desktop')}>
    <div className={cx('desktop_background')} style={{ backgroundImage: `url(${background})` }}/>
    <FileGrid>
      {children}
    </FileGrid>
  </div>
)
export default Desktop
