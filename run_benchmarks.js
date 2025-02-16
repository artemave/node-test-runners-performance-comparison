import { execSync } from 'node:child_process'
import { performance } from 'node:perf_hooks'
import { writeFileSync } from 'node:fs'
import colors from 'colors'
import { definitions, scenarioLabels } from './definitions.js'
import generateTests from './generateTests.js'
import generateCharts from './generateCharts.js'

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

const results = {}

for (const runner in definitions) {
  console.log(colors.cyan.bold(`************ ${runner} ************`))

  const definition = definitions[runner]

  generateTests(runner, definition.testTemplates, definition.cjs)

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

    let start = performance.now()
    execSync(scenario.cmd, { stderr: 'inherit' })

    const result = {
      ms: Math.round(performance.now() - start),
      notes: scenario.notes
    }

    results[runner][scenarioName] = result
    console.log(result)

    await wait(1000)
  }

  console.log('')
}

writeFileSync('results.json', JSON.stringify(results, null, 2))

await generateCharts(results)
