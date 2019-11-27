import { useContext, useEffect } from 'react'
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
      receive(matched, ref)
    }
  }
  const runExit = async () => {
    const matched = await animationCoordinator.out(label, ref)  
    if(matched) {
      send(ref, matched)
    }
  }

  useEffect(() => {
    (inProp ? runEnter() : runExit())
  }, [inProp])
}

export default useDeferredAnimation