'use strict'

const path = require('node:path')

// Fill in this config with all the configurations
// needed for testing the application
function config (env) {
  return {
    serverConfig: {
      logger: false
    },
    appConfig: {
      staticWebsite: path.resolve(__dirname, './fixtures')
    }
  }
}

// automatically build and tear down our instance
async function buildApp (t, env, serverOptions) {
  // config({ ...defaultEnv, ...env })

  const app = await require('../src/app')(config(env))
  t.teardown(() => { app.close() })
  return app
}

module.exports = {
  buildApp
}
