const mergeClasses = (c1, c2) => `${c1 || ''} ${c2 || ''}`

const mergeFunctions = (f1, f2) => {
  if(f1 && f2) {
    return (...args) => mergeClasses(f1(...args), f2(...args))
  }
  if(f1) {
    return f1
  }
  if(f2) {
    return f2
  }
}

const mergeThemes = (theme1, theme2) => {
  const merged = {}

  for(const key in theme1) {
    merged[key] = mergeFunctions(theme1[key], theme2[key])
  }
  for(const key in theme2) {
    merged[key] = mergeFunctions(theme1[key], theme2[key])
  }

  return merged
}

export default mergeThemes
