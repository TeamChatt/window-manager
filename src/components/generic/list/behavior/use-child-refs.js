import { useCallback, useRef, createRef } from 'react'
import { makeCursor } from '/utils/array-cursor'

export const useChildRefs = () => {
  const itemRefs = useRef({})

  const refAt = (lens) => lens.get(itemRefs.current)
  const makeRefAt = (lens) => {
    if(!refAt(lens)) {
      const itemRef = createRef()
      itemRefs.current = lens.set(itemRefs.current, itemRef)
    }
    return refAt(lens)
  }

  const elementAt = (arrayCursor) => {
    const itemRef = refAt(arrayCursor.lens) || {}
    return {
      ...itemRef.current,
      next: () => elementAt(arrayCursor.nextSibling()),
      prev: () => elementAt(arrayCursor.previousSibling()),
    }
  }

  const makeContext = useCallback((i) => {
    const arrayCursor = makeCursor(i)
    return {
      itemRef: makeRefAt(arrayCursor.lens),
      cursor: elementAt(arrayCursor),
    }
  }, [])

  return makeContext
}
