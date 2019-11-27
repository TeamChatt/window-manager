import React, { Children } from 'react'
import useChildRefs from './behavior/use-child-refs'
import ListContext from './context'

export const List = ({ children }) => {
  const makeContext = useChildRefs()
  const childrenWithContext = Children.map(children, (child, i) => (
    <ListContext.Provider value={makeContext(i)}>
      {child}
    </ListContext.Provider>
  ))
  return (<>{ childrenWithContext }</>)
}