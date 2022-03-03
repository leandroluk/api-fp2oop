import { usersController } from '$/controllers'
import { Router } from 'express'

const usersRoute = Router()

usersRoute.get('/:id', usersController.get)
usersRoute.put('/:id', usersController.edit)
usersRoute.delete('/:id', usersController.remove)
usersRoute.post('/', usersController.add)
usersRoute.get('/', usersController.list)

export { usersRoute }

