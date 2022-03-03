const mysql = require('mysql2/promise')
require('dotenv').config()

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = 3306,
  DB_NAME = 'api-fp2oop',
  DB_USER = 'root',
  DB_PASS = 'root',
} = process.env

const db = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  multipleStatements: true
})

const sql = `
DROP DATABASE IF EXISTS \`${DB_NAME}\`;
CREATE DATABASE \`${DB_NAME}\`;
USE \`${DB_NAME}\`;

CREATE TABLE \`users\` (
	\`id\` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	\`createdAt\` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	\`updatedAt\` DATETIME(3) NULL,
	\`email\` VARCHAR(100) NOT NULL UNIQUE,
	\`password\` VARCHAR(100) NOT NULL
);

INSERT INTO \`users\` (email, password) values ('user@email.com', '123456');
`

console.log('Migrating...')

db.query(sql)
  .then(() => [console.log('Finished.'), process.exit(0)])
  .catch(e => [console.error(`Failed. Reason: ${e.message}`), process.exit(1)])
