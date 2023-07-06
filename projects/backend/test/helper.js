'use strict'

const { fastify } = require('fastify')
const path = require('node:path')

const appPlugin = require('../src/app')

function defaultTestEnv () {
  return {
    NODE_ENV: 'test',
    WEBSITE_PATH: path.resolve(__dirname, './fixtures')
  }
}

function defaultTestServerConfig () {
  return {
    logger: false
  }
}

// automatically build and tear down our instance
async function buildApp (t, env, serverOptions) {
  const app = fastify({
    ...defaultTestServerConfig(),
    ...serverOptions
  })

  await app.register(appPlugin, {
    configData: {
      ...process.env,
      ...defaultTestEnv(),
      ...env
    }
  })

  t.teardown(() => { app.close() })
  return app
}

module.exports = {
  buildApp
}
