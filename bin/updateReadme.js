import fs from 'node:fs'

const readme = fs.readFileSync('readme.md', 'utf8').split('\n')
const results = fs.readFileSync('results.md', 'utf8').split('\n')

const cutOffStartLineNumber = readme.findIndex(line => line.startsWith('|'))
const cutOffEndLineNumber = readme.findLastIndex(line => line.startsWith('|'))

const updatedReadme = readme.slice(0, cutOffStartLineNumber)
updatedReadme.push(...results)
updatedReadme.push(...readme.slice(cutOffEndLineNumber + 2))

fs.writeFileSync('readme.md', updatedReadme.join('\n'))
