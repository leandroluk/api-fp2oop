import compression from 'compression'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import { usersRoute } from './routes'

const api = express()

// request middlewares (req, res, next)

api.use(express.json())
api.use(compression({ threshold: 0 }))
api.use((_req, res, next): void => {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-methods', '*')
  res.setHeader('access-control-allow-headers', '*')
  next()
})
api.use(helmet())
api.use(express.urlencoded({ extended: true }))

// routes

api.use('/api/users', usersRoute)
api.use('/health', (_, res) => res.send())

// response middlewares (err, req, res, next)

api.use((err: Error, _req: Request, res: Response, next: NextFunction): void => {
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
})

export default api

