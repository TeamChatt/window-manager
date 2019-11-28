import { useContext, useEffect } from 'react'
import useAnimation from './use-animation'
import AnimationContext from '../context'

const makeSurrogate = (el) => {
  const rect = el.getBoundingClientRect()
  return {
    getBoundingClientRect: () => rect,
  }
}

const useDeferredAnimation = (label, ref, inProp, receive, send) => {
  const animationCoordinator = useContext(AnimationContext)

  // TODO: make these cancelable
  const animateIn = async () => {
    const matched = await animationCoordinator.in(label, ref.current)
    if(matched) {
      receive(matched, ref.current)
    }
  }
  const animateOut = async () => {
    const rect = ref.current.getBoundingClientRect()
    const matched = await animationCoordinator.out(label, rect)
    if(matched) {
      send(ref.current, matched)
    }
  }

  useAnimation(ref, inProp, animateIn, animateOut)
  
  useEffect(() => {
    return () => {
      animationCoordinator.out(label, makeSurrogate(ref.current))
    }
  }, [])
}

export default useDeferredAnimation