import React from 'react'
import PropTypes from 'prop-types'
import { useFileGridContext } from './file-grid'

import styles from './file-grid-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

export const FileGridItem = ({ onDoubleClick, icon, label }) => {
  const color = useFileGridContext()
  return (
    <button
      className={cx('file-grid-item', {
        'file-grid-item--light': color === 'light',
        'file-grid-item--dark': color === 'dark',
      })}
      onDoubleClick={onDoubleClick}
    >
      <div className={cx('file-grid-item_inner')}>
        <img className={cx('file-grid-item_icon')} src={icon} draggable="false" />
        <span className={cx('file-grid-item_label')}>{label}</span>
      </div>
    </button>
  )
}
FileGridItem.propTypes = {
  onDoubleClick: PropTypes.func,
  icon: PropTypes.string,
  label: PropTypes.node,
}