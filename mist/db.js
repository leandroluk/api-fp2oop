const mysql = require('mysql2/promise')
require('dotenv').config()

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_NAME = 'api-fp2oop',
  DB_USER = 'root',
  DB_PASS = 'root'
} = process.env

const db = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  multipleStatements: true
})

const migration = `
DROP DATABASE IF EXISTS \`${DB_NAME}\`;
CREATE DATABASE \`${DB_NAME}\`;
USE \`${DB_NAME}\`;

CREATE TABLE \`users\` (
  \`id\` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  \`createdAt\` DATETIME(3) NOT NULL,
  \`updatedAt\` DATETIME(3) NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`password\` VARCHAR(100) NOT NULL
);
`

const seed = 'INSERT INTO `users` (createdAt, email, password) values (?, ?, ?);'

console.log('Migrating...')

db.query(migration)
  .then(() => db.query(seed, [new Date(), 'user@email.com', '123456']))
  .then(() => [console.log('Finished.'), process.exit(0)])
  .catch(e => [console.error(`Failed. Reason: ${e.message}`), process.exit(1)])
