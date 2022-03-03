import { usersFactory } from '$/app/factories'
import { Request, Response, Router } from 'express'

const usersController = usersFactory()

const get = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  const result = await usersController.get(id)
  res.json(result)
}

const edit = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  const result = await usersController.edit(id, req.body)
  res.json(result)
}

const remove = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id)
  await usersController.remove(id)
  res.send()
}

const add = async (req: Request, res: Response): Promise<void> => {
  const result = await usersController.add(req.body)
  res.status(201).json(result)
}

const list = async (_: Request, res: Response): Promise<void> => {
  const result = await usersController.list()
  res.json(result)
}

const usersRoute = Router()

usersRoute.get('/:id', get)
usersRoute.put('/:id', edit)
usersRoute.delete('/:id', remove)
usersRoute.post('/', add)
usersRoute.get('/', list)

export { usersRoute }

