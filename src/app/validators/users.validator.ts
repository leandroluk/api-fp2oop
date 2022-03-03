import { Entity, User } from '$/app/domain'
import Joi from 'joi'

export const usersValidator = {
  async id(
    value: any
  ): Promise<User['id']> {
    const schema = Joi.number().required().min(1)

    const result = await schema.validateAsync(value)
    return result
  },

  async add(
    value: any
  ): Promise<Omit<User, keyof Entity>> {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6)
    }).required().strict()

    const result = await schema.validateAsync(value)
    return result
  },

  async edit(
    value: any
  ): Promise<Partial<Omit<User, keyof Entity>>> {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(6)
    }).required().strict()

    const result = await schema.validateAsync(value)
    return result
  }
}
