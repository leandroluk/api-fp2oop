import { Entity, User } from '$/app/domain'
import { NotFoundError } from '$/app/errors'
import { usersModel } from '$/app/models'

const NOT_FOUND = 'User not found.'

export const usersService = {
  async get(
    id: User['id']
  ): Promise<User> {
    const result = await usersModel.get(id)
    if (!result) throw new NotFoundError(NOT_FOUND)
    return result
  },

  async edit(
    id: User['id'],
    changes: Partial<Omit<User, keyof Entity>>
  ): Promise<User> {
    const exists = await usersModel.get(id)
    if (!exists) throw new NotFoundError(NOT_FOUND)
    try {
      await usersModel.edit(id, changes)
    } catch (error) {
      throw new ReferenceError(error.message)
    }
    const result = await usersModel.get(id)
    return result
  },

  async remove(
    id: User['id']
  ): Promise<boolean> {
    const exists = await usersModel.get(id)
    if (!exists) throw new NotFoundError(NOT_FOUND)
    await usersModel.remove(id)
    return true
  },

  async add(
    data: Omit<User, keyof Entity>
  ): Promise<User> {
    try {
      const id = await usersModel.add(data)
      const result = await usersModel.get(id)
      return result
    } catch (error) {
      throw new ReferenceError(error.message)
    }
  },

  async list(): Promise<User[]> {
    const result = await usersModel.list()
    return result
  }
}
