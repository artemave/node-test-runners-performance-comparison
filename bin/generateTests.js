#!/usr/bin/env node

const fs = require('fs')
const glob = require('glob')

if (fs.existsSync('./build')) {
  fs.rmdirSync('./build', {recursive: true})
}
fs.mkdirSync('./build/donc', {recursive: true})
fs.mkdirSync('./build/mocha', {recursive: true})
fs.mkdirSync('./build/jest', {recursive: true})
fs.mkdirSync('./build/banana-shark', {recursive: true})
fs.mkdirSync('./build/tape', {recursive: true})

glob.sync('./node_modules/sails/lib/**/*.js').forEach(path => {
  const fileName = path.split('/').pop()
  const testFileName = fileName.replace('.js', 'Test.js')

  const doncTestFileContents = `require('../.${path}')
  const {test} = require('donc')
  const assert = require('assert')
  const jsdom = require('jsdom')

  test('${path} works', () => {
    assert.ok(true)
  })`

  const mochaTestFileContents = `require('../.${path}')
  const assert = require('assert')
  const jsdom = require('jsdom')

  describe('${path}', function() {
    it('works', function() {
      assert.ok(true)
    })
  })`

  const jestTestFileContents = `require('../.${path}')
  const jsdom = require('jsdom')

  test('${path} works', () => {
    expect(1).toBe(1)
  })`

  const bsTestFileContents = `require('../.${path}')
  const jsdom = require('jsdom')

  module.exports = describe => {
    describe(
      'one hundred and twenty three',
      () => 123,
      it => it.equals(123)
    )
  }`

  const tapeTestFileContents = `require('../.${path}')
  const jsdom = require('jsdom')
  const test = require('tape')

  test('${path}', function (t) {
    t.plan(1);
 
    t.equal(1, 1);
  })`

  fs.writeFileSync(`./build/donc/${testFileName}`, doncTestFileContents)
  fs.writeFileSync(`./build/mocha/${testFileName}`, mochaTestFileContents)
  fs.writeFileSync(`./build/jest/${testFileName}`, jestTestFileContents)
  fs.writeFileSync(`./build/banana-shark/${testFileName}`, bsTestFileContents)
  fs.writeFileSync(`./build/tape/${testFileName}`, tapeTestFileContents)
})
