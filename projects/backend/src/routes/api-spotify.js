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
      const responseData = await querySpotify(req.query, req.user)
      return reply.send(responseData)
    }
  })

  app.post('/share', {
    onRequest: [app.authenticate],
    schema: {
      body: queryParams,
      response: {
        200: {
          type: 'object',
          properties: {
            shareId: {
              type: 'string',
              maxLength: 36
            }
          }
        }
      }
    },
    handler: async function generateSharedLink (req, reply) {
      const responseData = await querySpotify(req.body, req.user)

      const shareItem = {
        shareId: randomUUID(),
        sharedBy: req.user.sub,
        filters: req.body,
        sharedContent: responseData
      }

      await app.insertShare(shareItem)

      return shareItem
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
      const shareItem = await app.getShare(req.params.shareId)
      if (!shareItem) {
        return reply.notFound()
      }

      return shareItem.sharedcontent // todo lowercase!!
    }
  })

  // TODO: memoize this function
  async function querySpotify ({ display, timeframe, limit }, user) {
    const type = display
    const accessToken = decodeURIComponent(user.tkn)

    const query = new URLSearchParams({
      time_range: timeframe,
      limit
    })

    const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      app.log.error({ error: response, user: user.sub }, 'Error calling spotify API')
      throw new Error(`Wrong Spotify response: ${response.statusText}`)
    }

    const responseData = await response.json()
    return responseData
  }
}
