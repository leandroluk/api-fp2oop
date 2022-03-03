import { UsersController } from '../controllers'
import { UsersModel } from '../models'
import { UsersService } from '../services'

export const usersFactory = (): UsersController => {
  const usersModel = new UsersModel()
  const usersService = new UsersService(usersModel)
  const usersController = new UsersController(usersService)
  return usersController
}
