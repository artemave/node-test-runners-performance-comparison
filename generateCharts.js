import { writeFileSync } from "fs"
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { scenarioLabels } from "./definitions.js"


// This must be created only once https://github.com/SeanSobey/ChartjsNodeCanvas/issues/9
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width: 800,
  height: 400,
  backgroundColour: 'white',
})

async function generateChart(data, fileName, label) {
  const sortedData = data.sort((a, b) => a.name.localeCompare(b.name))

  const chartOptions = {
    type: 'bar',
    plugins: [ ChartDataLabels ],
    options: {
      plugins: {
        datalabels: {
          color: '#36A2EB',
        }
      }
    },
    data: {
      labels: sortedData.map(({ name }) => name),
      datasets: [
        {
          data: sortedData.map(({ time }) => time),
          label,
        }
      ]
    }
  }

  const image = await chartJSNodeCanvas.renderToBuffer(chartOptions)
  writeFileSync(fileName, image)
}

export default async function generateCharts(results) {
  const resultsGroupedByScenario = {}

  for (const runner in results) {
    const runnerResults = results[runner]

    for (const scenario in runnerResults) {
      const scenarioResults = runnerResults[scenario]

      resultsGroupedByScenario[scenario] ||= []
      resultsGroupedByScenario[scenario].push({ name: runner, time: scenarioResults.total })
    }
  }

  for (const scenario in resultsGroupedByScenario) {
    await generateChart(resultsGroupedByScenario[scenario], scenario + '.png', scenarioLabels[scenario])
  }
}
