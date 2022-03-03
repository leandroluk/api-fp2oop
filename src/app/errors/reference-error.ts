export class ReferenceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReferenceError'
  }
}
