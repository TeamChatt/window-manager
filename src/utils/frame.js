const frame = () =>
  new Promise(resolve => window.requestAnimationFrame(resolve))

export default frame