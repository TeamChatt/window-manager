import React, { MouseEventHandler, ReactNode } from 'react'
import { useFileGridContext } from './file-grid'

import styles from './file-grid-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

type FileGridItemProps = {
  onDoubleClick: MouseEventHandler
  icon: string
  label: ReactNode
}
export const FileGridItem = ({
  onDoubleClick,
  icon,
  label,
}: FileGridItemProps) => {
  const color = useFileGridContext()
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onDoubleClick(e)
    }
  }
  return (
    <button
      className={cx('file-grid-item', {
        'file-grid-item--light': color === 'light',
        'file-grid-item--dark': color === 'dark',
      })}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
    >
      <div className={cx('file-grid-item_inner')}>
        <img
          className={cx('file-grid-item_icon')}
          src={icon}
          draggable="false"
        />
        <span className={cx('file-grid-item_label')}>{label}</span>
      </div>
    </button>
  )
}
