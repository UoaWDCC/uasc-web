import "@testing-library/jest-dom"

global.console = {
  ...console,
  // mute console.errors
  error: jest.fn()
}
