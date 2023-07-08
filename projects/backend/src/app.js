'use strict'

const fastifyStatic = require('@fastify/static')
const fastifyEnv = require('@fastify/env')
const fastifyCors = require('@fastify/cors')
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

  app.register(fastifyCors, {
    origin: new RegExp(app.appConfig.CORS_ORIGIN_REGEX),
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['content-type', 'authorization'],
    credentials: false,
    maxAge: 86400 // 24 hours
  })
  app.register(healthPlugin)
  app.register(oauthPlugin)

  app.register(fastifyStatic, {
    root: app.appConfig.WEBSITE_PATH
  })

  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  return app
}
