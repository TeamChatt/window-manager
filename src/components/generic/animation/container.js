import React, { useState } from 'react'
import AnimationCoordinator from './coordinator'
import AnimationContext from './context'

export const AnimationContainer = ({ children }) => {
  const [ animationCoordinator ] = useState(() => AnimationCoordinator())
  return (
    <AnimationContext.Provider value={animationCoordinator}>
      {children}
    </AnimationContext.Provider>
  )
}