'use strict'

const { test } = require('tap')

const { buildApp } = require('./helper')
const buildNativeApp = require('../src/app')

test('Can\'t start without config', async t => {
  await t.rejects(buildNativeApp())
})

test('App can be built', async t => {
  const app = await buildApp(t)
  await app.ready()

  t.pass('App was built successfully')
})

test('Health check is responding', async t => {
  const app = await buildApp(t)

  const res = await app.inject('/health')

  t.same(res.json(), { status: 'ok' })
})

test('The website is served', async t => {
  const app = await buildApp(t)
  const res = await app.inject('/')

  t.same(res.statusCode, 200)
  t.same(res.headers['content-type'], 'text/html; charset=UTF-8')
  t.same(res.body, 'hello I\'m index.html')
})
