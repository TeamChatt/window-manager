import React, { useRef } from 'react'
import { Outline } from '/components/outline'
import useAnimateRect from './behavior/use-animate-rect'

export const WMOutline = ({ id }) => {
  const ref = useRef()
  const { isAnimating, rect } = useAnimateRect(id, ref)
  return <Outline ref={ref} rect={rect} animate={isAnimating} />
}