'use strict'

const oauthPlugin = require('@fastify/oauth2')

module.exports = async function spotifyOauthPlugin (app, opts) {
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
    callbackUri: app.appConfig.OAUTH_REDIRECT_URI
  })

  app.get('/login/spotify/callback', async function oauth2Callback (req, reply) {
    const result = await app.spotify.getAccessTokenFromAuthorizationCodeFlow(req)

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${result.token.access_token}`
      }
    })

    if (!response.ok) {
      reply.status(500)
      return response.statusText
    }

    const data = await response.json()

    const tokenData = {
      tkn: encodeURIComponent(result.token.access_token),
      rsh: encodeURIComponent(result.token.refresh_token)
    }

    const tokenOptions = {
      iss: 'api.receiptify.dev',
      jti: data.email,
      sub: data.display_name,
      exp: result.token.expires_at.getTime()
    }

    const token = app.jwt.sign(tokenData, tokenOptions)

    // todo: store the new user in the our database

    req.log.info('The Spotify token is %o', result.token)

    // todo: encrypt the token before sending it to the client
    const redirectUrl = `${app.appConfig.SUCCESS_REDIRECT_URI}?token=${encodeURIComponent(token)}`

    return reply.redirect(redirectUrl)
  })
}
