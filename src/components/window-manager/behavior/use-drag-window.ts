import { useCallback, useRef, useState } from 'react'

type Position = {
  top: number
  left: number
}

export const useDragWindow = (
  position: Position,
  onMove: (position: Position) => void
) => {
  const positionRef = useRef({ top: 0, left: 0 })
  const startPositionRef = useRef({ top: 0, left: 0 })
  positionRef.current = position

  const [isDragging, setIsDragging] = useState(false)

  const onDragStart = useCallback(() => {
    startPositionRef.current = positionRef.current
    setIsDragging(true)
  }, [])
  const onDrag = useCallback(
    (offset) => {
      const newPosition = {
        top: startPositionRef.current.top + offset.top,
        left: startPositionRef.current.left + offset.left,
      }
      onMove(newPosition)
    },
    [onMove]
  )
  const onDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  return { isDragging, onDragStart, onDrag, onDragEnd }
}
