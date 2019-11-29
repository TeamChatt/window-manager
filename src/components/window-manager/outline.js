import React, { useRef } from 'react'
import { Outline } from '/components/outline'
import useAnimateRect from './behavior/use-animate-rect'

export const WMOutline = ({ label }) => {
  const ref = useRef()
  const { isAnimating, rect } = useAnimateRect(label, ref)
  return <Outline ref={ref} rect={rect} animate={isAnimating} />
}