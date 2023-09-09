module.exports = async function logout (app, opts) {
  app.post('/logout', {
    onRequest: [app.authenticate],
    handler: async function logoutHandler (req, reply) {
      const accessToken = decodeURIComponent(req.user.tkn)

      const response = await fetch('https://accounts.spotify.com/logout', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        req.log.error({ error: response }, 'Error calling spotify API')
        throw new Error(`Wrong Spotify response: ${response.statusText}`)
      }

      return reply.send({ message: 'You are logged out!' })
    }
  })
}
