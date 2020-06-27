import { useContext, useEffect } from 'react'
import runAsyncProcess from '/utils/run-async'
import { useAnimation } from './use-animation'
import { AnimationContext } from '../context'

const makeSurrogate = (el) => {
  const rect = el.getBoundingClientRect()
  return {
    getBoundingClientRect: () => rect,
  }
}

export const useDeferredAnimation = (id, ref, inProp, receive, send) => {
  const animationCoordinator = useContext(AnimationContext)

  const animateIn = async function * (){
    const matched = await animationCoordinator.in(id, ref.current)
    yield
    if(matched) {
      yield* receive(matched, ref.current)
    }
  }
  const animateOut = async function * (){
    const matched = await animationCoordinator.out(id, ref.current)
    yield
    if(matched) {
      yield* send(ref.current, matched)
    }
  }

  useAnimation(ref, inProp, runAsyncProcess(animateIn), runAsyncProcess(animateOut))
  
  useEffect(() => {
    return () => {
      animationCoordinator.out(id, makeSurrogate(ref.current))
    }
  }, [])
}
