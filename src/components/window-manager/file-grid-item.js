import React from 'react'

import { FileGridItem } from '/components/file-grid'
import { WMOutline } from './outline'
import { useWindowContext } from './manager'

import styles from './file-grid-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const defaultWindow = { state: {} }
export const WMFileGridItem = ({ icon, label, id, onDoubleClick }) => {
  const windows = useWindowContext()
  const window = windows.find(window => window.id === id) || defaultWindow
  const hasOutline = window.state.visibility === 'closed'

  return (
    <div className={cx('file-grid-item')}>
      <FileGridItem icon={icon} label={label} onDoubleClick={onDoubleClick}/>
      <div className={cx('file-grid-item_origin')}>
        {hasOutline && <WMOutline id={id} />}
      </div>
    </div>
  )
}
