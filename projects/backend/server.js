'use strict'

const path = require('node:path')

const buildApp = require('./src/app')

async function start () {
  const app = await buildApp({
    serverConfig: {
      logger: true
    },
    appConfig: {
      staticWebsite: path.resolve(__dirname, '../frontend/dist')
    }
  })

  try {
    await app.listen({ port: 3000 })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
