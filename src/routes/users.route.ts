import { usersController } from '$/controllers'
import { Router } from 'express'

const usersRoute = Router()

usersRoute.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const result = await usersController.get(id)
  res.json(result)
})

usersRoute.put('/:id', async (req, res) => {
  const id = Number(req.params.id)
  const result = await usersController.edit(id, req.body)
  res.json(result)
})

usersRoute.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await usersController.remove(id)
  res.send()
})

usersRoute.post('/', async (req, res) => {
  const result = await usersController.add(req.body)
  res.status(201).json(result)
})

usersRoute.get('/', async (_, res) => {
  const result = await usersController.list()
  res.json(result)
})

export { usersRoute }

