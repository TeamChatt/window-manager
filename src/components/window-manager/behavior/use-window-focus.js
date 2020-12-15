import { useRef, useEffect } from 'react'

export const useWindowFocus = (ref, { isFocused, onFocus, onBlur }) => {
  const isFocusedRef = useRef()
  isFocusedRef.current = isFocused

  useEffect(() => {
    if (isFocused && !ref.current.contains(document.activeElement)) {
      ref.current.focus({ preventScroll: true })
    }
  }, [isFocused])

  useEffect(() => {
    const handleFocus = () => {
      window.setTimeout(() => {
        const isActive =
          ref.current &&
          ref.current.contains(document.activeElement) ||
          ref.current === document.activeElement
        const isFocused = isFocusedRef.current
        if (isFocused && !isActive) {
          onBlur()
        }
        if (!isFocused && isActive) {
          onFocus()
        }
      }, 0)
    }
    document.addEventListener('focusout', handleFocus)
    document.addEventListener('focusin', handleFocus)
    return () => {
      document.removeEventListener('focusout', handleFocus)
      document.removeEventListener('focusin', handleFocus)
    }
  }, [])
}