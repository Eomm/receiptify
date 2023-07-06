'use strict'

module.exports.envSchema = {
  type: 'object',
  $id: 'schema:dotenv',
  required: ['NODE_ENV', 'PORT', 'WEBSITE_PATH'],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development'
    },
    PORT: {
      type: 'integer',
      default: 3000
    },
    WEBSITE_PATH: {
      type: 'string'
    }
  }
}
