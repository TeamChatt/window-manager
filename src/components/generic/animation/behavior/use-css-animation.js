import { useState } from 'react'
import cx from 'classnames'
import { frame } from '/utils/frame'

import useAnimation from './use-animation'

const stagedAnimation = (animation) => async (el) => {
  animation.setup()
  await frame()
  animation.run()
  await new Promise(resolve => el.addEventListener('transitionend', resolve, { once: true }))
  animation.teardown()
}

const useAnimationState = (name) => {
  const [animationState, setAnimationState] = useState([])
  const runAnimation = stagedAnimation({
    setup:    () => setAnimationState([name]),
    run:      () => setAnimationState([name, `${name}-active`]),
    teardown: () => setAnimationState([name, `${name}-done`]),
  })

  return [animationState, runAnimation]
}

const mapClassNames = (classNames, mapping) => cx(classNames.map(name => mapping[name]))

const useCSSAnimation = (ref, inProp, mapping) => {
  const [inState, runAnimationIn] = useAnimationState('enter')
  const [outState, runAnimationOut] = useAnimationState('exit')
  useAnimation(ref, inProp, runAnimationIn, runAnimationOut)

  return mapClassNames([...inState, ...outState], mapping)
}

export default useCSSAnimation