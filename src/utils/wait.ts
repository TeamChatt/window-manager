export const frame = (): Promise<number> =>
  new Promise((resolve) => window.requestAnimationFrame(resolve))

export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
