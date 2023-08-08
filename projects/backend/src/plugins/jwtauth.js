const fp = require('fastify-plugin')
const jwtPlugin = require('@fastify/jwt')

module.exports = fp(async function (app, opts) {
  app.register(jwtPlugin, {
    secret: app.appConfig.JWT_SECRET
  })

  app.decorate('authenticate', async function (request, reply) {
    await request.jwtVerify()
  })
})
