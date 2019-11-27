import React, { useState } from 'react'
import { frame } from '/utils/frame'
import AnimationContext from './context'

class AnimationCoordinator {
  constructor() {
    this.inMap = new Map()
    this.outMap = new Map()
  }
  
  async in(label, ref) {
    this.inMap.set(label, ref)
    await frame()
    const result = this.outMap.get(label)
    await frame()
    this.inMap.delete(label)
    return result
  }
  
  async out(label, ref) {
    this.outMap.set(label, ref)
    await frame()
    const result = this.inMap.get(label)
    await frame()
    this.outMap.delete(label)
    return result
  }
}

export const AnimationContainer = ({ children }) => {
  const [ animationCoordinator ] = useState(() => new AnimationCoordinator())
  return (
    <AnimationContext.Provider value={animationCoordinator}>
      {children}
    </AnimationContext.Provider>
  )
}