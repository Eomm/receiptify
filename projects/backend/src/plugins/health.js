'use strict'

module.exports = function healthPlugin (app, opts, next) {
  app.get('/health', async function healthHandler (request, reply) {
    return { status: 'ok' }
  })

  next()
}
