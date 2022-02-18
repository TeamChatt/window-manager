import React from 'react'
import { AnimationCoordinatorT, makeAnimationCoordinator } from './coordinator'

export const AnimationContext = React.createContext<
  AnimationCoordinatorT<string, any>
>(makeAnimationCoordinator())
