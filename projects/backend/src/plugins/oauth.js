'use strict'

const oauthPlugin = require('@fastify/oauth2')

module.exports = function spotifyOauthPlugin (app, opts, next) {
  app.register(oauthPlugin, {
    name: 'spotify',

    scope: ['user-read-email', 'user-top-read'],

    credentials: {
      client: {
        id: app.appConfig.SPOTIFY_CLIENT_ID,
        secret: app.appConfig.SPOTIFY_CLIENT_SECRET
      },

      auth: oauthPlugin.SPOTIFY_CONFIGURATION
    },

    startRedirectPath: '/login/spotify',
    callbackUri: `http://localhost:${app.appConfig.PORT}/login/spotify/callback`
  })

  app.get('/login/spotify/callback', async function oauth2Callback (req, reply) {
    const result = await app.spotify.getAccessTokenFromAuthorizationCodeFlow(req)

    // todo: call /me endpoint to get the user's email address
    // todo: store the new user in the our database
    // todo: generate a JWT for the user

    req.log.info('The Spotify token is %o', result.token)

    // {
    //   access_token: "llll",
    //   token_type: "Bearer",
    //   expires_in: 3600,
    //   refresh_token: "llll",
    //   scope: "user-read-email user-top-read",
    //   expires_at: "2023-07-06T17:36:27.792Z"
    //   }

    return reply.redirect('/app.html?user=manuel')
  })

  next()
}
