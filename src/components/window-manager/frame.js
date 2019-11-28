import React, { useRef } from 'react'
import { useCSSAnimation } from '/components/generic/animation'

import styles from './frame.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const transitionClassNames = {
  'enter':        cx('appear--enter'),
  'enter-active': cx('appear--enter-active'),
  'enter-done':   cx('appear--enter-done'),
}

export const WindowManagerFrame = ({ children }) => {
  const ref = useRef()
  const className = useCSSAnimation(ref, true, transitionClassNames)
  return (
    <div className={cx('window-manager-frame')}>
      {children}
      <div ref={ref} className={cx('window-manager-frame_shadow', className)} />
    </div>
  )
}