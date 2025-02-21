import { writeFileSync } from "fs"
import vegaLite from 'vega-lite'
import vega from 'vega'
import { scenarioLabels } from "./definitions.js"

async function generateChart(data, fileName, label) {
  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))

  const vegaLiteSpec = {
    title: label,
    data: {
      values: sortedData
    },
    mark: 'bar',
    width: 400,
    encoding: {
      y: { field: 'name', type: 'nominal', axis: { title: 'Runner' } },
      x: { field: 'ms', type: 'quantitative', axis: { title: 'ms' } },
      color: {
        condition: { test: "datum.name === 'baseline'", value: 'green' },
        value: 'steelblue' // Default color
      }
    },
    layer: [
      {
        mark: 'bar',
        encoding: {
          y: { field: 'name', type: 'nominal', axis: { title: 'Runner' } },
          x: { field: 'ms', type: 'quantitative', axis: { title: 'ms' } }
        }
      },
      {
        mark: {
          type: 'text',
          align: 'left',
          baseline: 'middle',
          dx: 3 // Adjust the position of the text
        },
        encoding: {
          text: { field: 'ms', type: 'quantitative' }
        }
      }
    ]
  }

  const { spec } = vegaLite.compile(vegaLiteSpec)
  const view = new vega.View(vega.parse(spec), { renderer: 'none' })
  const image = await view.toSVG()

  writeFileSync(fileName, image)
}

export default async function generateCharts(results) {
  const resultsGroupedByScenario = {}

  for (const runner in results) {
    const runnerResults = results[runner]

    for (const scenario in runnerResults) {
      const scenarioResults = runnerResults[scenario]

      resultsGroupedByScenario[scenario] ||= []
      resultsGroupedByScenario[scenario].push({ name: runner, ms: scenarioResults.ms })
    }
  }

  for (const scenario in resultsGroupedByScenario) {
    await generateChart(resultsGroupedByScenario[scenario], scenario + '.svg', scenarioLabels[scenario])
  }
}
