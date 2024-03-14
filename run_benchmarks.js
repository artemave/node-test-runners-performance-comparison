import { execSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import colors from 'colors'
import { definitions, scenarioLabels } from './definitions.js'
import generateTests from './generateTests.js'
import generateCharts from './generateCharts.js'

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

let results = {}
if (existsSync('./results.json')) {
  results = JSON.parse(readFileSync('./results.json', 'utf8'))
}

const timeFormat = JSON.stringify({
  total: "%e",
  system: "%S",
  user: "%U",
  cpu: "%P"
})

for (const runner in definitions) {
  console.log(colors.cyan.bold(`************ ${runner} ************`))

  const definition = definitions[runner]

  generateTests(runner, definition.testTemplates)

  for (const scenarioName in definition.scenarios) {
    process.stdout.write(colors.bold(`${scenarioLabels[scenarioName]}... `))
    results[runner] ||= {}

    const scenario = definition.scenarios[scenarioName]

    if (!scenario) {
      process.stdout.write('skipped')
      console.log('')
      results[runner][scenarioName] = {}
      continue
    }

    const cmd = `/usr/bin/time -o _result.json -f '${timeFormat}' ${scenario.cmd}`
    execSync(cmd, { stderr: 'inherit' })

    const result = readFileSync('_result.json', 'utf8')

    results[runner][scenarioName] = Object.assign(JSON.parse(result), { notes: scenario.notes })

    process.stdout.write(result)

    await wait(1000)
  }

  console.log('')
}

writeFileSync('results.json', JSON.stringify(results, null, 2))

await generateCharts(results)
