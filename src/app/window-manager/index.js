import React from 'react'
import WindowManager from './window-manager'
import ErrorBoundary from './error-boundary'

const WindowManagerContainer = () => (
  <ErrorBoundary>
    <WindowManager />
  </ErrorBoundary>
)

export default WindowManagerContainer
