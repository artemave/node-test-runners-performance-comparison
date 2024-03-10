#!/usr/bin/env node

import fs from 'fs'
import * as glob from 'glob'

if (fs.existsSync('./build')) {
  fs.rmSync('./build', {recursive: true})
}
fs.mkdirSync('./build/ars', {recursive: true})
fs.mkdirSync('./build/mocha', {recursive: true})
fs.mkdirSync('./build/jest', {recursive: true})
fs.mkdirSync('./build/tape', {recursive: true})
fs.mkdirSync('./build/uvu', {recursive: true})
fs.mkdirSync('./build/node', {recursive: true})
fs.mkdirSync('./build/ava', {recursive: true})
fs.mkdirSync('./build/vitest', {recursive: true})

glob.sync('./node_modules/sails/lib/**/*.js').forEach(p => {
  const path = p.replace('node_modules/', '')
  const fileName = path.split('/').pop()
  const testFileName = fileName.replace('.js', 'Test.js')

  const arsTestFileContents = `import '${path}'
  import {test} from 'assert-raisins'
  import assert from 'assert'

  test('${path} works', () => {
    assert.ok(true)
  })`

  const mochaTestFileContents = `import '${path}'
  import assert from 'assert'

  describe('${path}', function() {
    it('works', function() {
      assert.ok(true)
    })
  })`

  const jestTestFileContents = `import '${path}'

  test('${path} works', () => {
    expect(1).toBe(1)
  })`

  const tapeTestFileContents = `import '${path}'
  import test from 'tape'

  test('${path}', function (t) {
    t.plan(1);
 
    t.equal(1, 1);
  })`

  const uvuTestFileContents = `import '${path}'
  import { test } from 'uvu'
  import * as assert from 'uvu/assert'

  test('${path}', function () {
    assert.is(1, 1)
  })

  test.run()`

  const nodeTestFileContents = `import '${path}'
  import { it } from 'node:test'
  import assert from 'node:assert'

  it('${path} works', function() {
    assert.ok(true)
  })`

  const avaTestFileContents = `import '${path}'
  import test from 'ava'

  test('${path} works', t => {
    t.pass()
  })`

  const vitestTestFileContents = `import '${path}'
  import { expect, test } from 'vitest'

  test('${path} works', () => {
    expect(1).toBe(1)
  })`

  fs.writeFileSync(`./build/ars/${testFileName}`, arsTestFileContents)
  fs.writeFileSync(`./build/mocha/${testFileName}`, mochaTestFileContents)
  fs.writeFileSync(`./build/jest/${testFileName}`, jestTestFileContents)
  fs.writeFileSync(`./build/tape/${testFileName}`, tapeTestFileContents)
  fs.writeFileSync(`./build/uvu/${testFileName}`, uvuTestFileContents)
  fs.writeFileSync(`./build/node/${testFileName}`, nodeTestFileContents)
  fs.writeFileSync(`./build/ava/${testFileName}`, avaTestFileContents)
  fs.writeFileSync(`./build/vitest/${testFileName}`, vitestTestFileContents)
})
