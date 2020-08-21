#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')

if (fs.existsSync('./build')) {
  fs.rmdirSync('./build', {recursive: true})
}
fs.mkdirSync('./build/donc', {recursive: true})
fs.mkdirSync('./build/mocha', {recursive: true})
fs.mkdirSync('./build/jest', {recursive: true})

glob.sync('./node_modules/sails/lib/**/*.js').forEach(path => {
  const fileName = path.split('/').pop()
  const doncTestFileName = fileName.replace('.js', 'Test.js')
  const mochaTestFileName = fileName.replace('.js', 'Spec.js')
  const jestTestFileName = fileName.replace('.js', '.test.js')

  const doncTestFileContents = `require('../.${path}')
  const {test} = require('donc')
  const assert = require('assert')

  test('${path} works', () => {
    assert.ok(true)
  })`

  const mochaTestFileContents = `require('../.${path}')
  const assert = require('assert')

  describe('${path}', function() {
    it('works', function() {
      assert.ok(true)
    })
  })`

  const jestTestFileContents = `require('../.${path}')

  test('${path} works', () => {
    expect(1).toBe(1)
  })`

  fs.writeFileSync(`./build/donc/${doncTestFileName}`, doncTestFileContents)
  fs.writeFileSync(`./build/mocha/${mochaTestFileName}`, mochaTestFileContents)
  fs.writeFileSync(`./build/jest/${jestTestFileName}`, jestTestFileContents)
})
