import React from 'react'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

import minimize from './minimize.svg'
import close from './close.svg'

export const Window = ({ title, children, className, onMinimize, onClose }) => (
  <div className={cx('window', className)}>
    <div className={cx('window_header')}>
      <span className={cx('window_title')}>{title}</span>
      <div className={cx('window_buttons')}>
        <button
          onClick={onMinimize}
          className={cx('window-button', 'window-button--minimize')}
          name="minimize window"
        >
          <img src={minimize} alt=""/>
        </button>
        <button
          onClick={onClose}
          className={cx('window-button', 'window-button--close')}
          name="close window"
        >
          <img src={close} alt=""/>
        </button>
      </div>
    </div>
    <div className={cx('window_body')}>{children}</div>
  </div>
)
