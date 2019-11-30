import React, { useRef } from 'react'
import { useCSSAnimation } from '/components/generic/animation'
import { Window } from '/components/window'
import { WMOutline } from './outline'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const transitionClassNames = {
  'enter':        cx('appear--enter'),
  'enter-active': cx('appear--enter-active'),
  'enter-done':   cx('appear--enter-done'),
}

export const WMWindow = ({ id, title, children }) => {
  const ref = useRef()
  const transitionClassName = useCSSAnimation(ref, true, transitionClassNames)
  return (
    <div className={cx('window-frame')}>
      <Window className={transitionClassName} title={title}>
        {children}
      </Window>
      <WMOutline id={id} />
      <div ref={ref} className={cx('window-frame_shadow', transitionClassName)} />
    </div>
  )
}