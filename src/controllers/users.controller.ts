import { usersService } from '$/services'
import { usersValidator } from '$/validators'
import { Request, Response } from 'express'

export const usersController = {
  async get(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = await usersValidator.id(req.params.id)
    const result = await usersService.get(id)
    res.json(result)
  },

  async edit(
    req: Request,
    res: Response
  ): Promise<void> {
    const [id, changes] = await Promise.all([
      usersValidator.id(req.params.id),
      usersValidator.edit(req.body)
    ])
    const result = await usersService.edit(id, changes)
    res.json(result)
  },

  async remove(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = await usersValidator.id(req.params.id)
    await usersService.remove(id)
    res.send()
  },

  async add(
    req: Request,
    res: Response
  ): Promise<void> {
    const data = await usersValidator.add(req.body)
    const result = await usersService.add(data)
    res.status(201).json(result)
  },

  async list(
    _: Request,
    res: Response
  ): Promise<void> {
    const result = await usersService.list()
    res.json(result)
  }
}
