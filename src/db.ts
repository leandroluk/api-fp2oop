import vars from '$/vars'
import mysql from 'mysql2/promise'

export default mysql.createPool({
  database: vars.db.name,
  host: vars.db.host,
  user: vars.db.user,
  password: vars.db.pass
})
