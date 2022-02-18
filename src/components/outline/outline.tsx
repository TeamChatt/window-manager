import React, { forwardRef, RefObject } from 'react'

import styles from './outline.scss'
import classnames from 'classnames/bind'
const cx = classnames.bind(styles)

// eslint-disable-next-line react/display-name
type OutlineProps = {
  animate: boolean
  rect: {
    top: number
    bottom: number
    left: number
    right: number
  }
}
export const Outline = forwardRef(
  ({ animate, rect }: OutlineProps, ref: RefObject<HTMLDivElement>) => {
    const style = {
      top: rect.top,
      left: rect.left,
      bottom: rect.bottom,
      right: rect.right,
    }
    const className = cx('outline', {
      'outline--animate': animate,
    })
    return <div ref={ref} className={className} style={style} />
  }
)
