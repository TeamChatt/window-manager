import { useLayoutEffect } from 'react'

const useAnimation = (ref, inProp, animateIn, animateOut) => {
  // TODO: make these cancelable
  const runEnter = () => {
    animateIn(ref.current)
  }
  const runExit = () => {
    animateOut(ref.current)
  }

  useLayoutEffect(() => {
    (inProp ? runEnter() : runExit())
  }, [inProp])
}

export default useAnimation