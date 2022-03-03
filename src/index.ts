import db from './db'

// lazy load app only if database is connected
db.query('SELECT 1')
  .then(async () => {
    const { default: api } = await import('$/app')
    const { default: vars } = await import('$/vars')

    api.listen(vars.app.port, () => {
      console.log(`🚀 launched to Mars in port ${vars.app.port}`)
    })
  })
  .catch((e: Error) => {
    console.error(e.message)
    process.exit(1)
  })


