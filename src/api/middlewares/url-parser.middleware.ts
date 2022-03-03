import express from 'express'

export const urlParserMiddleware = express.urlencoded({ extended: true })
