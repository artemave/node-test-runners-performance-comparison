#!/usr/bin/env node

import fs from 'node:fs'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import ChartDataLabels from 'chartjs-plugin-datalabels'

function sortByName(list) {
  list.sort((a,b) => {
    if (a.name > b.name) {
      return 1
    } else if (a.name < b.name) {
      return -1
    } else {
      return 0
    }
  })
}

const results = fs.readFileSync('results.md', 'utf8')
const rawData = results.split('\n').slice(2, -1)

const singleTestData = []
const allTestsData = []

for (const line of rawData) {
  const [name, time] = line.split('|').filter(Boolean)

  if (name.match('single test')) {
    singleTestData.push({name: name.replace(' single test', ''), time})
  } else {
    allTestsData.push({name: name.replace(' all tests', ''), time})
  }
}

sortByName(singleTestData)
sortByName(allTestsData)

// This must be created only once https://github.com/SeanSobey/ChartjsNodeCanvas/issues/9
const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width: 800,
  height: 400,
  backgroundColour: 'white',
})

async function generateChart(data, fileName, label) {
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
      labels: data.map(({ name }) => name),
      datasets: [
        {
          data: data.map(({ time }) => time),
          label,
        }
      ]
    }
  }

  const image = await chartJSNodeCanvas.renderToBuffer(chartOptions)
  fs.writeFileSync(fileName, image)
}

await generateChart(allTestsData, 'all-tests.png', 'All tests')
await generateChart(singleTestData, 'single-test.png', 'Single test')
