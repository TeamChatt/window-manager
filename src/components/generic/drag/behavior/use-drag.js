import { useState, useCallback, useEffect } from 'react'

const ORIGIN = { left: 0, top: 0 }
const noop = () => {}

export const useDrag = ({ onDragStart = noop, onDrag = noop, onDragEnd = noop }) => {
  const [dragOrigin, setDragOrigin] = useState(ORIGIN)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = useCallback(({ clientX, clientY, button }) => {
    if (button === 2) return // ignore right clicks
    setIsDragging(true)
    setDragOrigin({ left: clientX, top: clientY })
    onDragStart()
  }, [])

  const handleMouseMove = useCallback(
    ({ clientX, clientY }) => {
      const offset = {
        left: clientX - dragOrigin.left,
        top:  clientY - dragOrigin.top,
      }
      onDrag(offset)
    },
    [dragOrigin, onDrag]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    onDragEnd()
  }, [onDragEnd])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return handleMouseDown
}
