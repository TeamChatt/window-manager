import React, { useRef, useEffect } from 'react'
import { useCSSAnimation } from '/components/generic/animation'
import { Window } from '/components/window'
import { WMOutline } from './outline'
import useDragWindow from './behavior/use-drag-window'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const transitionClassNames = {
  'enter':        cx('appear--enter'),
  'enter-active': cx('appear--enter-active'),
  'enter-done':   cx('appear--enter-done'),
}

export const WMWindow = ({
  id,
  title,
  children,
  order,
  position,
  isFocused,
  onMinimize,
  onClose,
  onFocus,
  onBlur,
  onMove,
}) => {
  const shadowRef = useRef()
  const transitionClassName = useCSSAnimation(shadowRef, true, transitionClassNames)

  const frameRef = useRef()
  useEffect(() => {
    if(isFocused && !frameRef.current.contains(document.activeElement)) {
      frameRef.current.focus()
    }
  }, [isFocused])

  const { onDragStart, onDrag, onDragEnd } = useDragWindow(position, onMove)
  const style = {
    zIndex: order,
    ...position,
  }

  return (
    <div
      className={cx('window-frame')}
      style={style}
      ref={frameRef}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex="0"
    >
      <Window
        className={transitionClassName}
        title={title}
        isFocused={isFocused}
        onMinimize={onMinimize}
        onClose={onClose}
        onDragStart={onDragStart}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {children}
      </Window>
      <WMOutline id={id} />
      <div
        ref={shadowRef}
        className={cx('window-frame_shadow', transitionClassName)}
      />
    </div>
  )
}