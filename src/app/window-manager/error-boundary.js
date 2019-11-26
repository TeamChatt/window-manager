import React, { Component } from 'react'

import { BSOD } from '/components/blue-screen-of-death'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    const { children } = this.props
    const { error } = this.state

    if (error) {
      return (<BSOD error={error} />)
    }

    return children
  }
}

export default ErrorBoundary
