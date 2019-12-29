import React from 'react'
import { useDrag } from '/components/generic/drag'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

import minimize from './minimize.svg'
import close from './close.svg'

export const Window = ({
  title,
  children,
  className,
  isFocused,
  onMinimize,
  onClose,
  onDragStart,
  onDrag,
  onDragEnd,
}) => {
  const handleMouseDown = useDrag({ onDragStart, onDrag, onDragEnd })
  return (
    <div className={cx(className, 'window', { 'window--focused': isFocused })}>
      <div className={cx('window_header')} onMouseDown={handleMouseDown}>
        <span className={cx('window_title')}>{title}</span>
        <div className={cx('window_buttons')}>
          <button
            onClick={onMinimize}
            className={cx('window-button', 'window-button--minimize')}
            name="minimize window"
          >
            <img src={minimize} alt="" />
          </button>
          <button
            onClick={onClose}
            className={cx('window-button', 'window-button--close')}
            name="close window"
          >
            <img src={close} alt="" />
          </button>
        </div>
      </div>
      <div className={cx('window_body')}>{children}</div>
    </div>
  )
  
}