import { useLayoutEffect } from 'react'

export const useAnimation = (ref, inProp, animateIn, animateOut) => {
  const runEnter = () => animateIn(ref.current)
  const runExit = () => animateOut(ref.current)

  useLayoutEffect(() => (inProp ? runEnter() : runExit()), [inProp])
}
