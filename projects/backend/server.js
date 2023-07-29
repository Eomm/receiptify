'use strict'

const { fastify } = require('fastify')

const appPlugin = require('./src/app')

async function start () {
  const app = fastify({
    logger: true
  })

  await app.register(appPlugin, {
    configData: process.env
  })

  try {
    process.on('SIGINT', () => {
      app.log.info('Gracefully shutting down')
      app
        .close()
        .then(() => {
          app.log.info('Shut down complete')
          process.exit(0)
        })
        .catch((err) => {
          app.log.error(err)
          process.exit(1)
        })
    })

    await app.listen({
      host: '0.0.0.0',
      port: app.appConfig.PORT
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
