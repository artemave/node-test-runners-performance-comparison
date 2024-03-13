# Node test runners performance comparison

Why does this exist? I was experimenting with a test runner that requires test files "statically" (via `node --require`) and wanted to see if this approach improves test start up time. I wanted to compare the aformentioned test runned - [assert-raisins](https://github.com/artemave/assert-raisins) - with [mocha](https://github.com/mochajs/mocha), because mocha (just like any other test runner I looked into) requires test files "dynamically", iterating over glob results.

Once test framework was in place, I added a bunch more popular test runners into the mix.

To generate sizable "import" load, I took a large Node project - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

### Results on my machine (seconds)

<p align="center">
  <img width="800" src="./singleTestFileImportOnly.png"/>
</p>
<p align="center">
  <img width="800" src="./allTestsFilesImportOnly.png"/>
</p>
<p align="center">
  <img width="800" src="./allTestsFilesWithLoad.png"/>
</p>

[Raw results](./results.json)

## Usage

```bash
npm install
node ./run_benchmarks.js
```

This generates charts and [results.json](./results.json) file with raw results.

I use [grip](https://github.com/joeyespo/grip) to preview markdown locally.
