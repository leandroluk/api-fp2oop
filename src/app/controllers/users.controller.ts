import { Entity, User } from '$/app/domain'
import { UsersService } from '$/app/services'
import { usersValidator } from '$/app/validators'

export class UsersController {
  usersService = new UsersService()

  async get(
    id: User['id']
  ): Promise<User> {
    id = await usersValidator.id(id)
    const result = await this.usersService.get(id)
    return result
  }

  async edit(
    id: User['id'],
    changes: Partial<Omit<User, keyof Entity>>
  ): Promise<User> {
    [id, changes] = await Promise.all([
      usersValidator.id(id),
      usersValidator.edit(changes)
    ])
    const result = await this.usersService.edit(id, changes)
    return result
  }

  async remove(
    id: User['id']
  ): Promise<boolean> {
    id = await usersValidator.id(id)
    const result = await this.usersService.remove(id)
    return result
  }

  async add(
    data: Omit<User, keyof Entity>
  ): Promise<User> {
    data = await usersValidator.add(data)
    const result = await this.usersService.add(data)
    return result
  }

  async list(): Promise<User[]> {
    const result = await this.usersService.list()
    return result
  }
}
