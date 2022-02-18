import { useState } from 'react'
import frame from '~/src/utils/frame'

import { useDeferredAnimation } from '~/src/components/generic/animation'

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
const makeCSSAnimation = (receive) => async function * (from, to) {
  receive.setup(from, to)
  await frame()
  yield
  receive.run(from, to)
  await new Promise(resolve => to.addEventListener('transitionend', resolve))
  yield
  receive.teardown(from, to)
}
const noAnimation = async function*(){}

export const useAnimateRect = (id, ref) => {
  const [rect, setRect] = useState(originRect)
  const [isAnimating, setIsAnimating] = useState(false)

  const receive = makeCSSAnimation({
    setup: (from, to) => {
      setRect(flipRect(from, to))
      setIsAnimating(false)
    },
    run: () => {
      setRect(originRect)
      setIsAnimating(true)
    },
    teardown: () => {
      setIsAnimating(false)
    },
  })
  const send = noAnimation
  useDeferredAnimation(id, ref, true, receive, send)

  return { rect, isAnimating }
}
