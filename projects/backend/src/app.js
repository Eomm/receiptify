'use strict'

const { fastify } = require('fastify')
const fastifyStatic = require('@fastify/static')

module.exports = buildApp

async function buildApp (opts) {
  const { serverConfig, appConfig } = opts || { appConfig: {} }
  const app = fastify(serverConfig)

  app.get('/health', async function healthHandler (request, reply) {
    return { status: 'ok' }
  })

  app.register(fastifyStatic, {
    root: appConfig.staticWebsite
    // constraints: { host: 'example.com' } // optional: default {}
  })

  return app
}
