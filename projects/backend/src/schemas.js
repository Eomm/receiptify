'use strict'

module.exports.envSchema = {
  type: 'object',
  $id: 'schema:dotenv',
  required: [
    'NODE_ENV',
    'PORT',
    'DB_URL',
    'WEBSITE_PATH',
    'CORS_ORIGIN_REGEX',
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'OAUTH_REDIRECT_URI',
    'SUCCESS_REDIRECT_URI',
    'JWT_SECRET'
  ],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development'
    },
    PORT: {
      type: 'integer',
      default: 3000
    },
    DB_URL: { type: 'string' },
    WEBSITE_PATH: { type: 'string' },
    CORS_ORIGIN_REGEX: { type: 'string' },
    SPOTIFY_CLIENT_ID: { type: 'string' },
    SPOTIFY_CLIENT_SECRET: { type: 'string' },
    OAUTH_REDIRECT_URI: { type: 'string' },
    SUCCESS_REDIRECT_URI: { type: 'string' },
    JWT_SECRET: { type: 'string' }
  }
}
