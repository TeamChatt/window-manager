import { useCallback, useRef, useState } from 'react'

export const useDragWindow = (position, onMove) => {
  const positionRef = useRef()
  const startPositionRef = useRef()
  positionRef.current = position

  const [isDragging, setIsDragging] = useState(false)

  const onDragStart = useCallback(() => {
    startPositionRef.current = positionRef.current
    setIsDragging(true)
  }, [])
  const onDrag = useCallback((offset) => {
    const newPosition = {
      top: startPositionRef.current.top + offset.top,
      left: startPositionRef.current.left + offset.left,
    }
    onMove(newPosition)
  }, [onMove])
  const onDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return { isDragging, onDragStart, onDrag, onDragEnd }
}
