import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs"
import glob from 'fast-glob'

if (!existsSync('./build')) {
  mkdirSync('./build')
}

const libFiles = glob.sync('./node_modules/sails/lib/**/*.js')

export default function generateTests(runner, testTemplates) {
  if (existsSync(`./build/${runner}`)) {
    rmSync(`./build/${runner}`, { recursive: true })
  }
  mkdirSync(`./build/${runner}`)

  for (const template in testTemplates) {
    mkdirSync(`./build/${runner}/${template}`)

    for (const libFile of libFiles) {
      const path = libFile.replace('./node_modules/', '')
      const fileName = path.split('/').pop()
      const testFileName = fileName.replace('.js', 'Test.js')

      const testFile = testTemplates[template](path)

      writeFileSync(`./build/${runner}/${template}/${testFileName}`, testFile)
    }
  }
}
