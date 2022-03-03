import { NextFunction, Request, Response } from 'express'

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response, next: NextFunction
): void => {
  const { name, message, details } = err as any

  switch (name) {
    case 'ValidationError': // bad request
      res.status(400).json({ message: details[0].message })
      break
    case 'NotFoundError': // not found
      res.status(404).json({ message })
      break
    case 'ReferenceError': // unprocessable entity
      res.status(422).json({ message })
      break
    default:
      res.status(500).json({ message })
  }

  next()
}
