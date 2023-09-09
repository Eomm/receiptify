'use strict'

const fastifyStatic = require('@fastify/static')
const fastifyEnv = require('@fastify/env')
const fastifyCors = require('@fastify/cors')
const fp = require('fastify-plugin')

const healthPlugin = require('./plugins/health')
const oauthPlugin = require('./plugins/oauth')
const jwtPlugin = require('./plugins/jwt-auth')

const spotifyRoutes = require('./routes/api-spotify')
const logout = require('./routes/logout')

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
  app.register(jwtPlugin)

  app.register(spotifyRoutes, { prefix: '/api/spotify' })
  app.register(logout)

  app.register(fastifyStatic, {
    root: app.appConfig.WEBSITE_PATH,
    prefix: '/'
  })

  app.setNotFoundHandler(function basic404 (request, reply) {
    return reply.sendFile('index.html')
  })

  // https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks

  return app
}
