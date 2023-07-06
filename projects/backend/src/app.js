'use strict'

const fastifyStatic = require('@fastify/static')
const fastifyEnv = require('@fastify/env')
const fp = require('fastify-plugin')

const healthPlugin = require('./plugins/health')
const oauthPlugin = require('./plugins/oauth')

const schemas = require('./schemas')

module.exports = fp(appPlugin, { name: 'app' })

async function appPlugin (app, opts) {
  await app.register(fastifyEnv, {
    confKey: 'appConfig',
    dotenv: opts.configData.NODE_ENV !== 'test',
    data: opts.configData,
    schema: schemas.envSchema
  })

  app.register(healthPlugin)
  app.register(oauthPlugin)

  app.register(fastifyStatic, {
    root: app.appConfig.WEBSITE_PATH
  })

  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  return app
}
