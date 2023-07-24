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
    callbackUri: app.appConfig.OAUTH_REDIRECT_URI
  })

  app.register(require('@fastify/jwt'), {
    secret: 'secret'
  })

  app.decorate('authenticate', async function (request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  app.get('/login/spotify/callback', async function oauth2Callback (req, reply) {
    const result = await app.spotify.getAccessTokenFromAuthorizationCodeFlow(req)

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${result.token.access_token}`
      }
    })

    if (!response.ok) {
      return reply.send(response.statusText)
    }

    const data = await response.json()

    const payload = {
      iss: 'https://api.spotify.com',
      tkn: encodeURIComponent(result.token.access_token),
      rsh: encodeURIComponent(result.token.refresh_token),
      name: data.display_name,
      jti: data.email,
      typ: 'sty',
      exp: new Date(result.token.expires_at).getTime()
    }

    const token = app.jwt.sign({ payload })

    console.log('JwtToken', token)

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

    const redirectUrl = `http://127.0.0.1:8080/login/spotify/callback?token=${encodeURIComponent(token)}`

    return reply.redirect(redirectUrl)
  })
}
