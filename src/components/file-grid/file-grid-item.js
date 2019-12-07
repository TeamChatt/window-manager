import React from 'react'

import styles from './file-grid-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const FileGridItem = ({ onDoubleClick, icon, label }) => (
  <button className={cx('file-grid-item')} onDoubleClick={onDoubleClick}>
    <div className={cx('file-grid-item_inner')}>
      <img className={cx('file-grid-item_icon')} src={icon} />
      <span className={cx('file-grid-item_label')}>{label}</span>
    </div>
  </button>
)