const reorder = (from, to) => index => {
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