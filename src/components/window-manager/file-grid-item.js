import React from 'react'

import { FileGridItem } from '/components/file-grid'
import { WMOutline } from './outline'

import styles from './file-grid-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const WMFileGridItem = ({ hasOutline, icon, label, id, onDoubleClick }) => (
  <div className={cx('file-grid-item')}>
    <FileGridItem icon={icon} label={label} onDoubleClick={onDoubleClick}/>
    <div className={cx('file-grid-item_origin')}>
      {hasOutline && <WMOutline id={id} />}
    </div>
  </div>
)