'use strict'

module.exports.envSchema = {
  type: 'object',
  $id: 'schema:dotenv',
  required: ['NODE_ENV', 'PORT', 'WEBSITE_PATH', 'SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET'],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development'
    },
    PORT: {
      type: 'integer',
      default: 3000
    },
    WEBSITE_PATH: { type: 'string' },
    SPOTIFY_CLIENT_ID: { type: 'string' },
    SPOTIFY_CLIENT_SECRET: { type: 'string' }
  }
}
