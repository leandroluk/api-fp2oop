import express from 'express'
import 'express-async-errors'
import {
  bodyParserMiddleware,
  compressionMiddleware,
  corsMiddleware,
  securityMiddleware,
  urlParserMiddleware
} from './middlewares'
import { errorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { usersRoute } from './routes'

const api = express()

// request middlewares (req, res, next)

api.use(bodyParserMiddleware)
api.use(compressionMiddleware)
api.use(corsMiddleware)
api.use(securityMiddleware)
api.use(urlParserMiddleware)

// routes

api.use('/api/users', usersRoute)
api.use('/health', (_, res) => res.send())

// response middlewares (err, req, res, next)

api.use(errorHandlerMiddleware)

export default api

