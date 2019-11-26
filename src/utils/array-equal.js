// Fast, shallow comparison of arrays
const arrayEqual = (arr1, arr2) => {
  if(arr1.length !== arr2.length) return false
  for(const i in arr1) {
    if(arr1[i] !== arr2[i]) return false
  }
  return true
}


export default arrayEqual
