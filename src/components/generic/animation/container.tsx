import React, { useState } from 'react'
import { makeAnimationCoordinator } from './coordinator'
import { AnimationContext } from './context'

export const AnimationContainer = ({ children }) => {
  const [animationCoordinator] = useState(() =>
    makeAnimationCoordinator<string, any>()
  )
  return (
    <AnimationContext.Provider value={animationCoordinator}>
      {children}
    </AnimationContext.Provider>
  )
}
