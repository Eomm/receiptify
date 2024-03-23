'use strict'

// const path = require('path')
const fastifyPostgres = require('@fastify/postgres')

module.exports = async function databaseSetup (app, opts) {
  await app.register(fastifyPostgres, {
    connectionString: opts.connectionString,
    max: 5,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000
  })

  // Migration setup
  // ? It does not work out of the box with our db provider
  // ? due the role settings, so we need to do it manually

  // const { default: Postgrator } = await import('postgrator')

  // const client = await app.pg.connect()
  // try {
  //   app.log.info('Running database migrations...')
  //   const postgrator = new Postgrator({
  //     migrationDirectory: path.join(__dirname, '../../migrations'),
  //     driver: 'pg',
  //     database: 'receiptify',
  //     currentSchema: 'asd',
  //     // schemaTable: 'schemaversion',
  //     execQuery: (query) => client.query(query)
  //   })

  //   await postgrator.migrate()
  //   app.log.info('Database migrations complete')
  // } finally {
  //   client.release()
  // }
}
