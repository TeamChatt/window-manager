import { useContext, useEffect } from 'react'
import { frame } from '/utils/frame'
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

// TODO: unify this with useAnimation
const useDeferredAnimation = (label, ref, inProp, send, receive) => {
  const animationCoordinator = useContext(AnimationContext)

  // TODO: make these cancelable
  const runEnter = async () => {
    const matched = await animationCoordinator.in(label, ref)  
    if(matched) {
      receive.enter(matched, ref)
      await frame()
      await receive.entering(matched, ref)
      receive.entered(matched, ref)
    }
  }
  const runExit = async () => {
    const matched = await animationCoordinator.out(label, ref)  
    if(matched) {
      send.exit(ref, matched)
      await frame()
      await send.exiting(ref, matched)
      send.exited(ref, matched)
    }
  }

  useEffect(() => {
    (inProp ? runEnter() : runExit())
  }, [inProp])
}

export default useDeferredAnimation