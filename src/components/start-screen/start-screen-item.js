import React, { useRef } from 'react'
import { useListFocus } from '/components/generic/list'

import styles from './start-screen-item.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const StartScreenItem = ({ icon, title, subtitle, onClick }) => {
  const ref = useRef()
  const { onKeyDown, isFocused, onFocus, onBlur } = useListFocus(ref)
  const className = cx('start-screen-item', {
    'start-screen-item--focused': isFocused,
  })

  return (
    <button
      className={className}
      ref={ref}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <div className={cx('start-screen-item_layout')}>
        <img className={cx('start-screen-item_icon')} src={icon} alt="" />
        <span className={cx('start-screen-item_title')}>{title}</span>
        <span className={cx('start-screen-item_subtitle')}>{subtitle}</span>
      </div>
    </button>
  )
}
export default StartScreenItem
