import { useContext, useImperativeHandle } from 'react'
import ListContext from '../context'

export const useCursor = (handle, deps) => {
  const { itemRef, cursor } = useContext(ListContext)
  useImperativeHandle(itemRef, handle, deps)
  return cursor
}
