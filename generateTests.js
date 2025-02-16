import { existsSync, mkdirSync, rmSync, writeFileSync } from "fs"
import glob from 'fast-glob'

if (!existsSync('./build')) {
  mkdirSync('./build')
}

const libFiles = glob.sync('./node_modules/sails/lib/**/*.js')

export default function generateTests(runner, testTemplates, cjs) {
  const runnerDir = `./build/${runner.replace(/\W/g, '_')}`

  if (existsSync(runnerDir)) {
    rmSync(runnerDir, { recursive: true })
  }
  mkdirSync(runnerDir)

  for (const template in testTemplates) {
    mkdirSync(`${runnerDir}/${template}`)

    for (const libFile of libFiles) {
      const path = libFile.replace('./node_modules/', '')
      const fileName = path.split('/').pop()
      const testFileName = fileName.replace('.js', `Test.${cjs ? 'c' : ''}js`)

      const testFile = testTemplates[template](path)

      writeFileSync(`${runnerDir}/${template}/${testFileName}`, testFile)
    }
  }
}
