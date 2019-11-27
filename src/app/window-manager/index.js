import React from 'react'
import { AnimationContainer } from '/components/generic/animation'
import WindowManager from './window-manager'
import ErrorBoundary from './error-boundary'

const WindowManagerContainer = () => (
  <ErrorBoundary>
    <AnimationContainer>
      <WindowManager />
    </AnimationContainer>
  </ErrorBoundary>
)

export default WindowManagerContainer
