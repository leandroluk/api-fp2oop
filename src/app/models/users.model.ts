import db from '$/app/db'
import { Entity, User } from '$/app/domain'
import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { Service } from 'typedi'

const TABLE = 'users'

const checkErrorDuplicateEntry = (error: Error): void => {
  if (error.message.includes('Duplicate entry')) {
    error.message = 'Email in use'
  }
}

@Service()
export class UsersModel {
  async get(
    id: User['id']
  ): Promise<User> {
    const sql = `SELECT * FROM ${TABLE} WHERE id = ?`
    const [[row]] = await db.query<RowDataPacket[]>(sql, [id])
    return row as User
  }

  async edit(
    id: User['id'],
    changes: Partial<Omit<User, keyof Entity>>
  ): Promise<boolean> {
    let sql = `UPDATE ${TABLE} SET `

    const [keys, values] = Object
      .entries(changes)
      .reduce((matrix, [key, value]) => {
        matrix[0].push(key)
        matrix[1].push(value)
        return matrix
      }, [[], []]) as [string[], unknown[]]

    keys.push('updatedAt')
    values.push(new Date())

    sql += keys.map(key => `${key} = ?`).join(', ') + ' WHERE id = ?'

    try {
      await db.query(sql, [...values, id])
      return true
    } catch (error) {
      checkErrorDuplicateEntry(error)
      throw error
    }
  }

  async remove(
    id: User['id']
  ): Promise<boolean> {
    const sql = `DELETE FROM ${TABLE} WHERE id = ?`

    try {
      await db.query(sql, [id])
      return true
    } catch (error) {
      checkErrorDuplicateEntry(error)
      throw error
    }
  }

  async add(
    data: Omit<User, keyof Entity>
  ): Promise<number> {
    const sql = `
      INSERT INTO ${TABLE} (createdAt, email, password) 
      VALUES (?, ?, ?)
    `

    try {
      const [{ insertId }] = await db.query<ResultSetHeader>(sql, [
        new Date(),
        data.email,
        data.password
      ])
      return insertId
    } catch (error) {
      checkErrorDuplicateEntry(error)
      throw error
    }
  }

  async list(): Promise<User[]> {
    const sql = `
      SELECT id, createdAt, updatedAt, email, password
      FROM ${TABLE}
    `
    const [rows] = await db.query<RowDataPacket[]>(sql)

    return rows as User[]
  }
}
