export const frame = () =>
  new Promise(resolve => window.requestAnimationFrame(resolve))
