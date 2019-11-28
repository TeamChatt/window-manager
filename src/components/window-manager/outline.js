import React, { useRef, useState } from 'react'
import { frame } from '/utils/frame'

import { Outline } from '/components/outline'
import { useDeferredAnimation } from '/components/generic/animation'

const originRect = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const flipRect = (from, to) => {
  const fromRect = from.getBoundingClientRect()
  const toRect   = to.getBoundingClientRect()
  return flipPosition(fromRect, toRect)
}
const flipPosition = (from, to) => ({
  top:      from.top    - to.top,
  left:     from.left   - to.left,
  bottom: -(from.bottom - to.bottom),
  right:  -(from.right  - to.right),
})
const makeCSSAnimation = (receive) => async (from, to) => {
  receive.setup(from, to)
  await frame()
  receive.run(from, to)
  await new Promise(resolve => to.addEventListener('transitionend', resolve))
  receive.teardown(from, to)
}

export const WindowManagerOutline = ({ label }) => {
  const ref = useRef()
  const [rect, setRect] = useState(originRect)
  const [animate, setAnimate] = useState(false)

  const send = () => {}
  const receive = makeCSSAnimation({
    setup: (from, to) => {
      setRect(flipRect(from, to))
      setAnimate(false)
    },
    run: () => {
      setRect(rect)
      setAnimate(true)
    },
    teardown: () => {
      setAnimate(false)
    },
  })
  useDeferredAnimation(label, ref, true, send, receive)

  return <Outline ref={ref} rect={rect} animate={animate} />
}