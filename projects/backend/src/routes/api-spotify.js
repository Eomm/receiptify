'use strict'

const { randomUUID } = require('node:crypto')

const queryParams = {
  type: 'object',
  properties: {
    display: {
      type: 'string',
      default: 'tracks',
      enum: ['artists', 'tracks', 'genres']
    },
    timeframe: {
      type: 'string',
      default: 'short_term',
      enum: [
        'short_term', // 4 weeks
        'medium_term', // 6 months
        'long_term' // all time
      ]
    },
    limit: {
      type: 'integer',
      default: 20,
      minimum: 1,
      maximum: 50
    }
  }
}

module.exports = async function spotifyPlugin (app, opts) {
  app.get('/top', {
    onRequest: [app.authenticate],
    schema: {
      querystring: queryParams
    },
    handler: async function readUserStats (req, reply) {
      // todo: response adapter
      const type = req.query.display
      const accessToken = decodeURIComponent(req.user.tkn)

      const query = new URLSearchParams({
        time_range: req.query.timeframe,
        limit: req.query.limit
      })

      const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?${query}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        req.log.error({ error: response }, 'Error calling spotify API')
        throw new Error(`Wrong Spotify response: ${response.statusText}`)
      }

      const responseData = await response.json()
      return reply.send(responseData)
    }
  })

  app.post('/share', {
    onRequest: [app.authenticate],
    schema: {
      body: queryParams
    },
    handler: async function generateSharedLink (req, reply) {
      // todo
      return { shareId: randomUUID() }
    }
  })

  app.get('/share/:shareId', {
    // todo rate limit
    schema: {
      params: {
        shareId: {
          type: 'string',
          maxLength: 36
        }
      }
    },
    handler: async function readSharedLink (req, reply) {
      // todo
      return require('./mock/top-tracks')
    }
  })
}
