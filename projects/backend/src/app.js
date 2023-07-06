'use strict'

const fastifyStatic = require('@fastify/static')
const fastifyEnv = require('@fastify/env')
const fp = require('fastify-plugin')

const schemas = require('./schemas')

module.exports = fp(appPlugin, { name: 'app' })

async function appPlugin (app, opts) {
  await app.register(fastifyEnv, {
    confKey: 'appConfig',
    dotenv: opts.configData.NODE_ENV !== 'test',
    data: opts.configData,
    schema: schemas.envSchema
  })

  app.get('/health', async function healthHandler (request, reply) {
    return { status: 'ok' }
  })

  app.register(fastifyStatic, {
    root: app.appConfig.WEBSITE_PATH
  })

  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  return app
}
