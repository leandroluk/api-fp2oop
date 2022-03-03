const { env } = process

export default {
  app: {
    port: Number(env.APP_PORT || 3000)
  },
  db: {
    host: env.DB_HOST || '127.0.0.1',
    port: Number(env.DB_PORT || 3306),
    name: env.DB_NAME || 'api-fp2oop',
    user: env.DB_USER || 'root',
    pass: env.DB_PASS || 'root'
  }
}
