const runAsyncProcess = (process) => (...args) => {
  const gen = process(...args)
  
  let canceled = false
  const run = async () => {
    // eslint-disable-next-line no-unused-vars
    for await(const unused of gen) {
      if(canceled) {
        break
      }
    }
  }
  run()

  return () => { canceled = true }
}

export default runAsyncProcess