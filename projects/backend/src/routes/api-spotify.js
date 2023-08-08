'use strict'

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
    }
  }
}

const mock = {
  tracks: require('./mock/top-tracks'),
  artists: require('./mock/top-artists'),
  genres: new Error('Not implemented')
}

module.exports = async function spotifyPlugin (app, opts) {
  app.get('/top', {
    onRequest: [app.authenticate],
    schema: {
      querystring: queryParams
    },
    handler: async function readUserStats (req, reply) {
      // todo: response adapter
      return mock[req.query.display]
    }
  })
}
