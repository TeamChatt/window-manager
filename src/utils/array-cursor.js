import { emptyLens, propertyLens } from '/utils/lenses'

const keyLens = (key) => (key === undefined)
  ? emptyLens
  : propertyLens(key)

export const makeCursor = (index) => ({
  index,
  lens:             keyLens(index),
  nextSibling:      () => makeCursor(index+1),
  previousSibling:  () => makeCursor(index-1),
})

export const emptyCursor = {
  lens: emptyLens,
  nextSibling: () => emptyCursor,
  previousSibling: () => emptyCursor
}

export function* cursorRange(startCursor, endCursor) {
  const isForwards = startCursor.index < endCursor.index

  let currentCursor = startCursor
  yield currentCursor
  while(currentCursor.index !== endCursor.index) {
    currentCursor = isForwards
      ? currentCursor.nextSibling()
      : currentCursor.previousSibling()
    yield currentCursor
  }
}
