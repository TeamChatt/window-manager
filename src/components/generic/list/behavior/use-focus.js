import { useCallback, useState } from 'react'
import useCursor from './use-cursor'

const focusNext = (cursor) => {
  if(cursor.next().focus) {
    cursor.next().focus()
  }
}

const focusPrev = (cursor) => {
  if(cursor.prev().focus) {
    cursor.prev().focus()
  }
}

export const useFocus = (ref) => {
  const [ isFocused, setIsFocused ] = useState(false)

  const cursor = useCursor(() => ({
    focus(){
      ref.current.focus()
    }
  }))

  const onKeyDown = useCallback((e) => {
    if(e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      e.stopPropagation()
    }

    switch(e.key) {
      case 'ArrowDown':
        focusNext(cursor)
        break
      case 'ArrowUp':
        focusPrev(cursor)
        break
    }
  }, [cursor])

  return {
    focusNext: useCallback(() => focusNext(cursor), [cursor]),
    focusPrev: useCallback(() => focusPrev(cursor), [cursor]),
    onFocus:   useCallback(() => setIsFocused(true), []),
    onBlur:    useCallback(() => setIsFocused(false), []),
    isFocused,
    onKeyDown,
  }
}
