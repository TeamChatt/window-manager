import React, {
  createContext,
  useRef,
  useContext,
  RefObject,
  ReactNode,
} from 'react'
import { useCSSAnimation } from '~/src/components/generic/animation'
import { Window } from '~/src/components/window'
import { WMOutline } from './outline'
import { useDragWindow } from './behavior/use-drag-window'
import { useWindowFocus } from './behavior/use-window-focus'

import styles from './window.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

const transitionClassNames = {
  enter: cx('appear--enter'),
  'enter-active': cx('appear--enter-active'),
  'enter-done': cx('appear--enter-done'),
}

const WindowElementContext = createContext<RefObject<HTMLElement> | null>(null)

export const useWMWindowElement = () => useContext(WindowElementContext)!

type WMWindowProps = {
  id: string
  title: string
  children: ReactNode
  order: number
  visibility: 'open' | 'closed' | 'minimized'
  position: { top: number; left: number }
  dimensions?: any
  isFocused: boolean
  onMinimize: () => void
  onClose: () => void
  onFocus: () => void
  onBlur: () => void
  onMove: (position: { top: number; left: number }) => void
}
export const WMWindow = ({
  id,
  title,
  children,
  order,
  visibility,
  position,
  dimensions,
  isFocused,
  onMinimize,
  onClose,
  onFocus,
  onBlur,
  onMove,
}: WMWindowProps) => {
  const shadowRef = useRef(null)
  const transitionClassName = useCSSAnimation(
    shadowRef,
    visibility === 'open',
    transitionClassNames
  )

  const frameRef = useRef(null)
  useWindowFocus(frameRef, { isFocused, onFocus, onBlur })

  const { onDragStart, onDrag, onDragEnd } = useDragWindow(position, onMove)
  const style = {
    zIndex: order,
    visibility: visibility === 'open' ? 'visible' : 'hidden',
    ...position,
    ...dimensions,
  }

  return (
    <WindowElementContext.Provider value={frameRef}>
      <div
        className={cx('window-frame')}
        aria-hidden={visibility !== 'open'}
        style={style}
        ref={frameRef}
        tabIndex={0}
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
          {visibility === 'closed' ? <></> : children}
        </Window>
        {visibility === 'open' ? <WMOutline id={id} /> : <></>}
        <div
          ref={shadowRef}
          className={cx('window-frame_shadow', transitionClassName)}
        />
      </div>
    </WindowElementContext.Provider>
  )
}
