import React, { useRef } from 'react'
import { useCSSAnimation } from '/components/generic/animation'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const transitionClassNames = {
  'enter':        cx('appear--enter'),
  'enter-active': cx('appear--enter-active'),
  'enter-done':   cx('appear--enter-done'),
}

export const Window = ({ title, children }) => {
  const ref = useRef()
  const className = useCSSAnimation(ref, true, transitionClassNames)

  return (
    <div ref={ref} className={cx('window', className)}>
      <div className={cx('window_header')}>
        {title}
      </div>
      <div className={cx('window_body')}>
        {children}
      </div>
    </div>
  )
}