import { useContext, useEffect, useLayoutEffect } from 'react'
import AnimationContext from '../context'

// const useAnimation = (inProp, animateIn, animateOut) => {
//   // TODO: make these cancelable
//   const runEnter = async () => {
//     await frame()
//     animateIn.enter()
//     await frame()
//     await animateIn.entering()
//     animateIn.entered()
//   }
//   const runExit = async () => {
//     await frame()
//     animateOut.exit()
//     await frame()
//     await animateOut.exiting()
//     animateOut.exited()
//   }

//   useEffect(() => (inProp ? runEnter() : runExit()), [inProp])
// }

const makeSurrogate = (el) => {
  const rect = el.getBoundingClientRect()
  return {
    getBoundingClientRect() {
      return rect
    },
    addEventListener() {}
  }
}

// TODO: unify this with useAnimation
const useDeferredAnimation = (label, ref, inProp, send, receive) => {
  const animationCoordinator = useContext(AnimationContext)

  // TODO: make these cancelable
  const runEnter = async () => {
    const matched = await animationCoordinator.in(label, ref.current)
    if(matched) {
      receive(matched, ref.current)
    }
  }
  const runExit = async () => {
    const rect = ref.current.getBoundingClientRect()
    const matched = await animationCoordinator.out(label, rect)
    if(matched) {
      send(ref.current, matched)
    }
  }

  useLayoutEffect(() => {
    (inProp ? runEnter() : runExit())
  }, [inProp])
  
  useEffect(() => {
    return () => {
      animationCoordinator.out(label, makeSurrogate(ref.current))
    }
  }, [])
}

export default useDeferredAnimation