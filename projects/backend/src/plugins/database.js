'use strict'

// const path = require('path')
const fp = require('fastify-plugin')
const SQL = require('@nearform/sql')
const fastifyPostgres = require('@fastify/postgres')

module.exports = fp(async function databaseSetup (app, opts) {
  await app.register(fastifyPostgres, {
    connectionString: opts.connectionString,
    max: 5,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000
  })

  app.decorate('insertShare', async function (shareItem) {
    const query = insert('share', shareItem)
    app.log.debug(`Inserting share: ${shareItem.shareId}`)

    const result = await app.pg.query(query)
    return result.rowCount === 1
  })

  app.decorate('getShare', async function (shareId) {
    const query = SQL`SELECT * FROM share WHERE shareId = ${shareId}`
    app.log.debug(`Fetching share: ${shareId}`)

    const result = await app.pg.query(query)
    return result.rows[0]
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
})

function insert (table, insertData) {
  const builder = Object.entries(insertData).reduce(
    (acc, [column, value]) => {
      if (value !== undefined) {
        acc.columns.push(column)
        acc.values.push(SQL`${value}`)
      }
      return acc
    },
    { columns: [], values: [] }
  )
  return SQL`INSERT INTO ${SQL.quoteIdent(table)} (${SQL.unsafe(
    builder.columns.join(', ')
  )}) VALUES (${SQL.glue(builder.values, ', ')})`
}
