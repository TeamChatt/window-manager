const reorder = (from: number, to: number) => (index: number): number => {
  if (index === from) {
    return to
  }
  if (index < from && index < to) {
    return index
  }
  if (index > from && index > to) {
    return index
  }
  if (to > from) {
    return index - 1
  }
  if( to < from) {
    return index + 1
  }
  return index
}

export default reorder