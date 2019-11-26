import React, { Children, Fragment } from 'react'
import useChildRefs from './behavior/use-child-refs'
import ListContext from './context'

const List = ({ children }) => {
  const makeContext = useChildRefs()
  const childrenWithContext = Children.map(children, (child, i) => (
    <ListContext.Provider value={makeContext(i)}>
      {child}
    </ListContext.Provider>
  ))
  return (
    <Fragment>
      { childrenWithContext }
    </Fragment>
  )
}

export default List
