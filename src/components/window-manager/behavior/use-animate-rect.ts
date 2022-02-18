import { useState } from 'react'
import { frame } from '~/src/utils/wait'

import { useDeferredAnimation } from '~/src/components/generic/animation'

type Rect = {
  left: number
  top: number
  right: number
  bottom: number
}
const originRect: Rect = {
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
}

const flipRect = (from, to) => {
  const fromRect = from.getBoundingClientRect()
  const toRect = to.getBoundingClientRect()
  return flipPosition(fromRect, toRect)
}
const flipPosition = (from: Rect, to: Rect): Rect => ({
  top: from.top - to.top,
  left: from.left - to.left,
  bottom: -(from.bottom - to.bottom),
  right: -(from.right - to.right),
})

type CSSAnimation = {
  setup: (from: any, to: any) => void
  run: (from: any, to: any) => void
  teardown: (from: any, to: any) => void
}
const makeCSSAnimation = (anim: CSSAnimation) =>
  async function* (from, to) {
    anim.setup(from, to)
    await frame()
    yield
    anim.run(from, to)
    await new Promise((resolve) =>
      to.addEventListener('transitionend', resolve)
    )
    yield
    anim.teardown(from, to)
  }
const noAnimation = async function* () {}

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
